
import { useState, useEffect } from "react";
import { Bell, Calendar, Clock, Pill, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "reminder" | "alert" | "info";
  read: boolean;
  action?: string;
}

const Notifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Medication Reminder",
      description: "Time to take your Paracetamol (500mg)",
      time: "10 minutes ago",
      type: "reminder",
      read: false,
      action: "Take Now"
    },
    {
      id: "2",
      title: "Blood Pressure Check",
      description: "You've scheduled a blood pressure check for today",
      time: "2 hours ago",
      type: "alert",
      read: false,
    },
    {
      id: "3",
      title: "Doctor's Appointment",
      description: "Upcoming appointment with Dr. Smith tomorrow at 10:00 AM",
      time: "Yesterday",
      type: "info",
      read: false,
    },
    {
      id: "4",
      title: "Health Assessment Complete",
      description: "Your monthly health assessment has been completed. View your results.",
      time: "2 days ago",
      type: "info",
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "Marked all as read",
      description: "All notifications have been marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "Notification removed",
      description: "The notification has been removed",
    });
  };

  const handleAction = (id: string, action?: string) => {
    if (action === "Take Now") {
      toast({
        title: "Medication Taken",
        description: "Great job! We've recorded that you've taken your medication.",
      });
    }
    markAsRead(id);
  };

  // Get the count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container py-8">
      <SectionHeader
        title="Notifications"
        description={`You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        align="left"
      />

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2">
            {unreadCount} unread
          </Badge>
          <Badge variant="outline">
            {notifications.length} total
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all duration-200 ${notification.read ? 'opacity-70' : 'border-l-4 border-l-primary shadow-md'}`}
            >
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-2 ${
                      notification.type === 'reminder' ? 'bg-blue-100 dark:bg-blue-900' :
                      notification.type === 'alert' ? 'bg-red-100 dark:bg-red-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      {notification.type === 'reminder' ? (
                        <Pill className={`h-4 w-4 text-blue-600 dark:text-blue-400`} />
                      ) : notification.type === 'alert' ? (
                        <Bell className={`h-4 w-4 text-red-600 dark:text-red-400`} />
                      ) : (
                        <Calendar className={`h-4 w-4 text-green-600 dark:text-green-400`} />
                      )}
                    </div>
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    {!notification.read && (
                      <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">New</Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {notification.time}
                    </span>
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p>{notification.description}</p>
              </CardContent>
              {(notification.action || !notification.read) && (
                <CardFooter className="pt-0 flex justify-end gap-2">
                  {!notification.read && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                  {notification.action && (
                    <Button 
                      size="sm"
                      onClick={() => handleAction(notification.id, notification.action)}
                    >
                      {notification.action}
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No notifications</h3>
            <p className="text-muted-foreground mt-2">
              You don't have any notifications at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

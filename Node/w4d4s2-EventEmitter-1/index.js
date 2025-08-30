const  EventEmitter  = require('events');

class NotificationSystem extends EventEmitter{
    constructor(){
        super();
        this.notification=[];
    }
    getNotifications(){
        return this.notification;
    }
    sendNotification(notification){
        const fullNot={...notification, status : 'sent'}
        this.notification.push(fullNot);
        this.emit('notificationSent',fullNot);
    }
    readNotification(id){
        const search=this.notification.find((item)=> item.id==id);
        if(search)
        {
            search.status='read';
            this.emit('notificationRead',id)
        }
    }
    deleteNotification(id){
        const index=this.notification.findIndex((item)=>item.id==id)
        if(index!==-1)
        {
            this.notification.splice(index,1);
            this.emit('notificationDeleted',id);
        }
    }
}
module.exports=NotificationSystem;
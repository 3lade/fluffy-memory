let jobQueue=[];

const addJob = (job) =>
{
    jobQueue.push(job);
    console.log(`Job ${job.id} added to the queue.`);
}

const startProcessing = () =>
{
    console.log("Starting job processing...");
    
    function processingTask() {
        
        if(jobQueue.length===.0)
        {
            console.log("No more jobs to process");
            return;
        }
        
        const job = jobQueue.shift();
        console.log(`Processing job ${job.id}: ${job.task}`);

        setTimeout(() => {
            console.log(`Completed job ${job.id}: ${job.task}`);
            processingTask();
        }, 1000);
    }
    processingTask();

    // jobQueue.forEach((job) => {
    //     console.log(`Processing job ${job.id}: ${job.task}`);
    //     setTimeout(() => {
    //         console.log(`Completed job ${job.id}: ${job.task}`);
    //     }, 1000);
    // })
    // console.log("No more jobs to process");

}



module.exports={
    jobQueue,
    addJob,
    startProcessing
};
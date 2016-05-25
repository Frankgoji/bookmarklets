javascript:(function(
    // make an invisible iframe, open copytext site, see if yes or no, then
    // alert
    f=document.createElement('IFRAME');
    f.style='display:none';
    f.height=0;
    f.weight=0;
    f.source='http://copytext.io/mturk_line_reading_tasks/availability?workerId=WORKERID';
    workerid='A3FC95LOHLP9SD';
    document.getElementsByTagName('body')[0].appendChild(f);
))();

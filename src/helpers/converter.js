const timeConverter = (givenMinutes) => {
    if(typeof givenMinutes === 'number'){
        let num = givenMinutes;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        // return num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
        return rhours + " hour(s) and " + rminutes + " minute(s).";
    }else{
        return 'invalid data'
    }
    
}

export { timeConverter };

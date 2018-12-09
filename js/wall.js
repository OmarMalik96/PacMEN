class Wall(){
    constructor(muri) {
        this.caselle = [];
        this.dir = 0;
        this.muri = muri;
    }

    generate(){
        function getRndInteger(min,max) {
            var result = Math.floor(Math.random() * (max - min + 1) ) + min;
            if(result %2!=0) {
                result = result + 1;
            }
            return result;
        }
        this.dir = Math.floor(Math.random() * 2);
        this.caselle.push(getRndInteger(0,14));
        var len = getRndInteger(0,6)+1;
        var increment = 1;
        if(this.dir == 1){
            increment = 15;
        }
        var casella;
        for(len; len > 0; len--) {
            casella = this.caselle[this.caselle.length-1] + increment;

            if(!this.check(casella)) {
                return;
            }
        this.caselle.push[casella];
        }
    }

}

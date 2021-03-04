"use strict";

(function main(){

    const _$ = _attr => {
        return document.querySelectorAll(_attr);
    }

    const canConvertTo = (text, value) => {
        let counter = 0;
        for(let i=0;i<text.length;i++){
            if(counter >= value)
                break;
            let c = text.charAt(i);
            if (c === value.charAt(counter))
                counter++;
        }
        return counter === value.length
    }

    const postedHoursAgo = text => {
        let hours = ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "0h"]
        for(let i=0;i<hours.length;i++){
            if(canConvertTo(text, hours[i]))
                return true;
        }
        return false;
    }

    const postedMinAgo = text => {
        let mins = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "0m"];
        for(let i=0;i<mins.length;i++){
            if(canConvertTo(text, mins[i]))
                return true;
        }
        return false;
    }

    const isSponsored = text => {
        if(postedMinAgo(text) || postedHoursAgo(text) || text.indexOf(":") >= 0) return false;
        return canConvertTo(text, 'Sponsored');
    }

    const addAlreadyCheckedClass = div => {
        div.classList.add("checked-sponsor");
    }
    
    const removeIfSponsored = div => {
        try {
            let spans = div.querySelectorAll('a[href="#"]');
            let flag = false;
            spans.forEach(span => {
                let text = span.innerText;
                text = text.split(/\r\n|\r|\n/g).join('');
                if(isSponsored(text)){
                    div.remove();
                    flag = true;
                }
            })
            return flag;
        } catch (error) {
            return false;
        }
    }
    
    const cleanSponsoredAds = () => {
        let divs_0 = _$('[data-pagelet="FeedUnit_0"]');
        let divs_1 = _$('[data-pagelet="FeedUnit_1"]');
        let divs_n = _$('[data-pagelet="FeedUnit_{n}"]');
        let divs = [...divs_0, ...divs_1, ...divs_n];
        for(let div of divs){
            if(div.className.indexOf("checked-sponsor") >= 0)
                continue;
            let isRemoved = removeIfSponsored(div);
            if(!isRemoved){
                addAlreadyCheckedClass(div);
            }
        }
    }

    window.addEventListener('DOMContentLoaded', cleanSponsoredAds);
    window.addEventListener('load', cleanSponsoredAds);
    window.addEventListener('scroll', cleanSponsoredAds)

})();
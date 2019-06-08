"use strict";

(function main(){

    const $ = _class => {
        return document.getElementsByClassName(_class);
    }
    
    const removeIfSponsored = div => {
        try {
            let deleteable = div.children[0].children[1].children[0].children[0].children[1].children[1].children[0].children[0].children[1].children[1];
            if (deleteable.innerText.indexOf("Sponsored") > -1) {
                div.remove();
            }
        } catch (error) {
            
        }
    }
    
    const cleanSponsoredAds = () => {
        let divs = $('userContentWrapper');
        for(let div of divs){
            removeIfSponsored(div);
        }
    }

    window.addEventListener('DOMContentLoaded', cleanSponsoredAds);
    window.addEventListener('load', cleanSponsoredAds);
    window.addEventListener('scroll', cleanSponsoredAds)

})();
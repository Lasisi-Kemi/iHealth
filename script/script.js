if(window.location.pathname === '/dashboard.html'){
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });
}

if (window.location.pathname === "/index.html" || window.location.pathname === "/" ){
  var width = document.getElementById("slider").children[0].clientWidth;
  var current = 0;
  var __is_running = false;
  function scroll(index){
    __is_running = true;
    var increment = 1;
    var last_scroll = current;
    var next_scroll = index;
    var slider_div = document.getElementById("slider")
 
    slider_div.children[next_scroll].style.display = "block"
    slider_div.children[last_scroll].style.display = "block"
    if (last_scroll > next_scroll){
      slider_div.scrollLeft = (width* 2)
    } else {
      slider_div.scrollLeft = 1
    }
    var on_complete = () => {
      slider_div.children[last_scroll].style.display = "none"
      current = next_scroll;
    }
    var scroll_to = setInterval(()=>{
      try {
        if (last_scroll > next_scroll){
          slider_div.scrollLeft -= increment ;
        } else {
          slider_div.scrollLeft += increment ;
        }
        increment += 1;
        if (increment >= 40){
          clearInterval(scroll_to);
          on_complete();
          __is_running = false
        }
      } catch (error) {
        console.error(error)
        clearInterval(scroll_to);
        __is_running = false
      }


    },50)

  }
  var reverse = false 
  if (!__is_running){
    setInterval(()=>{
      if (reverse && current ===0){
        reverse = false 
        scroll(current + 1)
      } else if (reverse) {
        scroll(current - 1)
      } else if (!reverse && current + 1 === document.getElementById("slider").children.length){
        reverse = true
        scroll(current - 1)
      } else {
        scroll(current+ 1)
      }
    }, 10000)
  }
  leftarr.addEventListener("click", ()=>{!__is_running && current != 0 && scroll(current - 1)  })
  rightarr.addEventListener("click", ()=>{ !__is_running && current + 1 != document.getElementById("slider").children.length && scroll(current + 1)  })

  document.getElementById("form-submit").addEventListener("submit", ()=>{
    event.preventDefault()
    document.getElementById("subscribed-pop-up").style.display = "block"
  
    setTimeout(()=> {document.getElementById("subscribed-pop-up").style.display = "none"}, 3000)
    return false
  })
}

try {
  if(window.location.pathname === '/volunteer.html'){
    var inputs = document.getElementsByTagName("input");
    var i1 = inputs[0]
    var i2 = inputs[1]
    i1.addEventListener("click", ()=> { 
      i1.checked = true;
      i2.checked = false;
      window.location.pathname = "/nonmedical.html"
    })
    i2.addEventListener("click", ()=> { 
      i2.checked = true;
      i1.checked = false;
      window.location.pathname = "/medicalvolunteer.html"
    })
  }
} catch{}

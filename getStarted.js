window.addEventListener("DOMContentLoaded", function(){
  const APIURL = "https://api.betterdoctor.com/2016-03-01/doctors?"
  const skipLimitUserKey = "skip=0&limit=10&user_key="
  const APIkey = "eaabcd50796c9064a50c991f7acebedf"
  let header = document.getElementsByClassName("getStarted")[0]
  let scrollbar = document.getElementsByClassName("futureDocs")[0]
  let hurtsButtons = document.getElementsByClassName("hurtsButtons")[0]
  let buttons = Array.from(document.getElementsByTagName("BUTTON"))
  let done = document.getElementsByClassName("done")[0]
  let futureDocs = document.getElementsByClassName("futureDocs")[0]
  var selected = [];
  let selectedDocs = []
  let doctorButtons = []

  const doctors = {
    "ent doctor":["ears", "nose", "throat", "mouth"],
    "podiatrist":["ankle", "foot"],
    "orthopedist":["ankle", "foot", "arm", "back", "neck", "leg", "knee", "joints", "shoulders"],
    "chiropractor":["back", "neck"],
    "acupuncturist":["back", "neck", "leg", "knee"],
    "ophthamologist":["eyes"],
    "neurologist":["head"],
    "cardiologist":["heart"],
    "rheumatologist":["joints", "wrist"],
    "pulmonologist":["lungs"],
    "dentist":["teeth"],
    "physiatrist":["shoulders"],
    "gastroenterologist":["stomach"],
    "primary":["ankle", "foot", "arm", "back", "neck", "ears", "eyes", "head", "heart", "leg", "knee", "joints", "lungs", "mouth", "nose", "shoulders", "stomach", "stomach", "throat", "wrist"]
  }


  buttons.forEach(button => {
    button.addEventListener("click", function(e){
        if (e.target.className === "hurts"){
          e.target.className = "buttonClicked";
          selected.push(e.target.innerHTML);
          console.log(selected);
        }
        else if (e.target.className === "buttonClicked"){
           e.target.className = "hurts"
           selected = selected.filter(sel => {
             return e.target.innerHTML !== sel
           })
        }
    })
})

  done.addEventListener("click", function(e){
    for (let i = 0; i < selected.length; i++){
      for (const key in doctors){
        if (doctors[key].includes(selected[i]) && !selectedDocs.includes(key)){
           selectedDocs.push(key)
        }
      }

    futureDocs.innerHTML=`<h3>Here are your options:</h3>`
        selectedDocs.forEach(doc=>{

          futureDocs.innerHTML+=`<button class="docs">${doc}</button>`
          doctorButtons = Array.from(document.getElementsByClassName("docs"))
        })
      }

      doctorButtons.forEach(btn => {
        btn.addEventListener("click", function(e){
          scrollbar.className[0] = "futureDocsShow"
          let specialist = `specialty_uid=${e.target.innerText}`
          navigator.geolocation.getCurrentPosition(position => {
            const latLong = `&location=${position.coords.latitude}%2C%20${position.coords.longitude}%2C%2015&`

            fetch(`${APIURL}${specialist}${latLong}${skipLimitUserKey}${APIkey}`)
            .then(res => res.json())
            .then(json => {
              if (json.data.length > 0) renderDocs(json.data)
              else (alert(`There are no ${e.target.innerText}s in your area.`))
            })
          })
        })
      })
    })

  function renderDocs(docs){
    header.innerText = "Doctor Options"
    document.getElementsByClassName("doneBtn")[0].innerHTML = ""
    hurtsButtons.innerHTML = ""
    futureDocs.innerHTML = ""
    futureDocs.className = "renderedDocs"
    docs.forEach(doc => {
      futureDocs.innerHTML += `
      <div class="person">
        <h3> ${doc.profile.first_name} ${doc.profile.last_name} </h3>
        <p> ${doc.specialties[0].name} </p>
        <p> ${doc.practices[0].visit_address.street}, ${doc.practices[0].visit_address.city}, ${doc.practices[0].visit_address.state}, ${doc.practices[0].visit_address.zip} </p>
        <p> ${doc.practices[0].phones[0].number}</p>
      </div>`
    })
  }
})

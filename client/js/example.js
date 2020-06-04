async function loadExampleList() {
    // Ladda in data ifrån databasen (via backend)
    let result = await fetch("/data/people")
    let people = await result.json()
    renderExampleList(people)
  }
  // Denna startar vi först så att vi laddar in listan på personer
  loadExampleList()
  
  function renderExampleList(people) {
    let list = $("<ul/>")
    for (let person of people) {
      list.append(`<li>${person.name}: ${person.email}</li>`)
    }
    $("main").html(list)
  }
  
  // Lyssna på knapp-klick för att skapa en ny person
  $("body").on("click", "button", createPerson)
  
  async function createPerson() {
    let person = {}
    person.name = $("#name").val()
    person.email = $("#email").val()
    // Skicka den nya personen till databasen (via backend)
    let result = await fetch("/data/people", {
      body: JSON.stringify(person),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    // Ladda listan på personer igen, eftersom vi just uppdaterat den
    loadExampleList()
  }
  
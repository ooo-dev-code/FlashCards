describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    const names = [
      'Bioig', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ian', 'Jack',
      'Karen', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Sam', 'Tina',
      'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zane', 'Abby', 'Ben', 'Cathy', 'Derek'
    ];

    const passwords = [
      'password@@&&2829857099POVDDKBJLFMLKFG2', 'password@@&&2829857099POVDDKBJLFMLKFG3', 'password@@&&2829857099POVDDKBJLFMLKFG4', 'password@@&&2829857099POVDDKBJLFMLKFG5', 'password@@&&2829857099POVDDKBJLFMLKFG6', 'password@@&&2829857099POVDDKBJLFMLKFG7', 'password@@&&2829857099POVDDKBJLFMLKFG8', 'password@@&&2829857099POVDDKBJLFMLKFG9', 'password@@&&2829857099POVDDKBJLFMLKFG10',
      'password@@&&2829857099POVDDKBJLFMLKFG11', 'password@@&&2829857099POVDDKBJLFMLKFG12', 'password@@&&2829857099POVDDKBJLFMLKFG13', 'password@@&&2829857099POVDDKBJLFMLKFG14', 'password@@&&2829857099POVDDKBJLFMLKFG15', 'password@@&&2829857099POVDDKBJLFMLKFG16', 'password@@&&2829857099POVDDKBJLFMLKFG17', 'password@@&&2829857099POVDDKBJLFMLKFG18', 'password@@&&2829857099POVDDKBJLFMLKFG19', 'password@@&&2829857099POVDDKBJLFMLKFG20',
      'password@@&&2829857099POVDDKBJLFMLKFG21', 'password@@&&2829857099POVDDKBJLFMLKFG22', 'password@@&&2829857099POVDDKBJLFMLKFG23', 'password@@&&2829857099POVDDKBJLFMLKFG24', 'password@@&&2829857099POVDDKBJLFMLKFG25', 'password@@&&2829857099POVDDKBJLFMLKFG26', 'password@@&&2829857099POVDDKBJLFMLKFG27', 'password@@&&2829857099POVDDKBJLFMLKFG28', 'password@@&&2829857099POVDDKBJLFMLKFG29', 'password@@&&2829857099POVDDKBJLFMLKFG30'
    ];

    const rectos = [
      'What is your favorite color?', 'What is your favorite food?', 'What is your hobby?', 'What is your dream job?',
      'What is your favorite movie?', 'What is your favorite book?', 'What is your favorite sport?', 'What is your favorite animal?', 'What is your favorite season?',
      'What is your favorite holiday?', 'What is your favorite song?', 'What is your favorite band?', 'What is your favorite TV show?', 'What is your favorite game?',
      'What is your favorite subject?', 'What is your favorite drink?', 'What is your favorite dessert?', 'What is your favorite city?', 'What is your favorite country?',
      'What is your favorite language?', 'What is your favorite fruit?', 'What is your favorite vegetable?', 'What is your favorite flower?', 'What is your favorite car?',
      'What is your favorite superhero?', 'What is your favorite villain?', 'What is your favorite quote?', 'What is your favorite number?', 'What is your favorite day of the week?'
    ];

    const versos = [
      'Blue', 'Pizza', 'Reading', 'Astronaut',
      'Inception', '1984', 'Soccer', 'Dog', 'Spring',
      'Christmas', 'Bohemian Rhapsody', 'The Beatles', 'Breaking Bad', 'Chess',
      'Math', 'Coffee', 'Ice Cream', 'Paris', 'Japan',
      'English', 'Apple', 'Carrot', 'Rose', 'Tesla',
      'Spider-Man', 'Joker', 'To be or not to be', '7', 'Friday'
    ];


    names.forEach((name, index) => {
      
    cy.wait(2000)
    cy.get('button[class="registerbtn"]').click()

      cy.get('input[name="username"]').type(name)
      cy.get('input[name="password"]').type(passwords[index])
      cy.get('button[type="submit"]').click()
      cy.wait(1000)

    cy.get('input[id="setName"]').type("My self")
    cy.get('input[id="description"]').type("A set with card to remember some things about my self")

    cy.get('button[type="submit"]').click()
    cy.wait(1000)

    cy.get('button[class="My self"]').first().click()
    

    rectos.forEach((recto, index) => {
      cy.get('input[id="recto"]').type(recto)
      cy.get('input[id="verso"]').type(versos[index])
      cy.get('button[type="submit"]').click()
      cy.wait(1000)
    })

    cy.get('button[class="logout"]').first().click() 
    
    })
  })
})

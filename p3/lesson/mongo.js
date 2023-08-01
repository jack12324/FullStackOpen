const mongoose = require('mongoose')
const Note = require('./models/note')

if(process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://jacksporter24:${password}@fullstack.yhxkbxb.mongodb.net/testNoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

if(process.argv.length === 3) {
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5){
  const note = new Note({
    content: process.argv[3],
    important: process.argv[4],
  })

  note.save().then(() => {
    console.log('note saved!')
    mongoose.connection.close()
  })
} else {
  console.log('invalid number of arguments')
  process.exit(1)
}


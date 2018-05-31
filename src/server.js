const express = require('express')
const cors = require('cors')
const _ = require('lodash')
const app = express()

const { cards } = require('./../mock/cards.json')

app.use(cors())

app.get('/api/cards', (req, res) => {
  const { name, type, limit = 20 } = req.query

  if (_.every([name, type], item => item === undefined)) {
    return res.json({ cards: cards.slice(0, limit) })
  }

  res.json({
    cards: _.filter(cards, card => {
      const name = _.toUpper(_.get(req, 'query.name', ''))
      const type = _.toUpper(_.get(req, 'query.type', ''))
      const checkName = _.includes(_.toUpper(card.name), name)
      const checkType = _.includes(_.toUpper(card.type), type)
      return checkName && checkType
    })
  })

})

app.listen(3030, () => console.log('app start @ port 3030'))
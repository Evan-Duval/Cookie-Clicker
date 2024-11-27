<template>
  <div class="tic-tac-toe">
    <h1>Morpion</h1>
    
    <div class="game-info">
      <p>Tour actuel : <span class="current-player">{{ currentPlayer }}</span></p>
      <p>Prochain joueur : <span class="next-player">{{ nextPlayer }}</span></p>
    </div>

    <div class="game-board">
      <div 
        v-for="(cell, index) in board" 
        :key="index" 
        class="cell"
        @click="handleCellClick(index)"
      >
        {{ cell }}
      </div>
    </div>

    <div v-if="winner" class="game-result">
      <p v-if="winner === 'Égalité'">Match nul !</p>
      <p v-else>Le joueur {{ winner }} a gagné !</p>
      <button @click="resetGame">Nouvelle partie</button>
    </div>

    <div class="leaderboard">
        <p>Victoires X : {{ scoreX }}</p>
        <p>Victoires O : {{ scoreO }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      scoreX: 0,
      scoreO: 0,
    }
  },
  computed: {
    nextPlayer() {
      return this.currentPlayer === 'X' ? 'O' : 'X'
    }
  },
  methods: {
    handleCellClick(index) {
      if (this.board[index] || this.winner) return
      this.board[index] = this.currentPlayer
      this.checkWinner()

      if (!this.winner) {
        this.currentPlayer = this.nextPlayer
      }
    },
    checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ]

      for (let combo of winningCombinations) {
        const [a, b, c] = combo
        if (
          this.board[a] && 
          this.board[a] === this.board[b] && 
          this.board[a] === this.board[c]
        ) {
          this.winner = this.board[a]
          
          return
        }
      }

      if (this.board.every(cell => cell !== null)) {
        this.winner = 'Égalité'
      }
    },
    resetGame() {

      if (this.winner === "X") {
        this.scoreX++
      } else if (this.winner === "O") {
        this.scoreO++
      }

      this.board = Array(9).fill(null)
      this.currentPlayer = 'X'
      this.winner = null
    }
  }
}
</script>

<style scoped>
* {
  background-color: grey;
}

.tic-tac-toe {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.leaderboard {
  background-color:grey;
  border: solid 1px black;
  border-radius:8px;
}

.cell {
  background-color: #f0f0f0;
  border: 2px solid #333;
  width: 85px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cell:hover {
  background-color: #e0e0e0;
}

.game-info {
  margin-bottom: 20px;
}

.current-player {
  color: blue;
  font-weight: bold;
}

.next-player {
  color: green;
  font-weight: bold;
}

.game-result {
  margin-top: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
<template>
    <main>
      <div class="back-wrapper">
           <router-link class="back-class" to="/financial-tips">
            <img class="back-button" src="../../assets/images/ic_back_grey.png" alt="back">
             <a class="back-text">Back to overview</a>
            </router-link>
          </div>
      <section class="survey-form">
        <h1>Can You Finance Your Move?</h1>
        <h2>Please answer the following questions to see if you can finance your move:</h2>
  
        <form @submit.prevent="processSurvey">
          <!-- Question 1 -->
          <label>What is your estimated budget for the move?</label><br>
          <input type="radio" id="under_1000" v-model="moveBudget" value="under_1000">
          <label for="under_1000">Under €1,000</label><br>
          <input type="radio" id="1000_to_3000" v-model="moveBudget" value="1000_to_3000">
          <label for="1000_to_3000">€1,000 to €3,000</label><br>
          <input type="radio" id="3000_to_5000" v-model="moveBudget" value="3000_to_5000">
          <label for="3000_to_5000">€3,000 to €5,000</label><br>
          <input type="radio" id="over_5000" v-model="moveBudget" value="over_5000">
          <label for="over_5000">Over €5,000</label><br><br>
  
          <!-- Question 2 -->
          <label>Do you have savings set aside for the move?</label><br>
          <input type="radio" id="yes" v-model="currentSavings" value="yes">
          <label for="yes">Yes</label><br>
          <input type="radio" id="no" v-model="currentSavings" value="no">
          <label for="no">No</label><br><br>
  
          <!-- Question 3 -->
          <label>Is your income steady and sufficient to cover the move and other expenses?</label><br>
          <input type="radio" id="steady" v-model="incomeSteady" value="steady">
          <label for="steady">Yes, I have a stable income</label><br>
          <input type="radio" id="unstable" v-model="incomeSteady" value="unstable">
          <label for="unstable">No, my income is unstable</label><br><br>
  
          <!-- Question 4 -->
          <label>Do you have any financial support (from family, friends, etc.)?</label><br>
          <input type="radio" id="yesSupport" v-model="financialSupport" value="yes">
          <label for="yesSupport">Yes</label><br>
          <input type="radio" id="noSupport" v-model="financialSupport" value="no">
          <label for="noSupport">No</label><br><br>
  
          <!-- Submit Button -->
          <button type="submit">Submit Survey</button>
        </form>
  
        <!-- Feedback Section -->
        <div v-if="feedbackMessage" :class="['feedback', feedbackClass]">
          <p v-html="feedbackMessage"></p>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: 'FinanceSurveyPage',
    data() {
      return {
        moveBudget: null,
        currentSavings: null,
        incomeSteady: null,
        financialSupport: null,
        feedbackMessage: '',
        feedbackClass: ''
      };
    },
    methods: {
      processSurvey() {
        // Check if all questions are answered
        if (!this.moveBudget || !this.currentSavings || !this.incomeSteady || !this.financialSupport) {
          alert("Please answer all questions.");
          return;
        }
  
        // Calculate feedback
        let feedbackMessage = "";
        let feedbackClass = "";
  
        if (this.moveBudget === "over_5000" && this.currentSavings === "yes" && this.incomeSteady === "steady") {
          feedbackMessage = "You're in a good place financially to move! You have a solid budget, savings, and a steady income.";
          feedbackClass = "good-feedback";
        } else {
          feedbackMessage = "It looks like you might need to save for a while to be fully ready for your move. Consider reviewing our <a @click.prevent='goToFinancialTips'>financial tips</a> to help you prepare.";
          feedbackClass = "recommend-feedback";
        }
  
        // Display feedback
        this.feedbackMessage = feedbackMessage;
        this.feedbackClass = feedbackClass;
      },
      goToFinancialTips() {
    this.$router.push({ name: 'financial-tips' });
  }
    }
  };
  </script>
  
  <style scoped>
  .back-class {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: 30px auto 0;
    max-width: 600px;
    transform: translateX(-15%);
  }

  .back-button {
    width: 16px;
    height: 16px;
  }

  .back-text {
    font-size: 14px;
    font-family: var(--font-family);
    font-weight: 600;
    color: var(--primary-text);
    margin-left: 10px;
    text-decoration: none;
  }

  .survey-form {
    max-width: 600px;
    margin: 80px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ffff;
    padding-bottom: 180px; /* Ensure enough space for the fixed navbar */
  }
  /* Feedback styles */
  .feedback {
    margin-top: 20px;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
  }

  .good-feedback {
    background-color: #d4edda;
    color: #155724;
  }

  .recommend-feedback {
    background-color: #fff3cd;
    color: #856404;
  }

  /* Ensure the form is scrollable */
  body {
    overflow-y: auto;
    margin-bottom: 100px; /* Provide space at the bottom */
  }

  /* Mobile-specific adjustments */
  @media (max-width: 600px) {
    .back-class {
      transform: translateX(0); /* Center it left-leaning */
      margin: 20px 20px 0 10px; /* Keep it close to the left */
      max-width: none; /* Let it take the full width for mobile */
    }

    .back-text {
      font-size: 14px;
      margin-left: 8px; /* Adjust text spacing */
    }
    .survey-form {
      padding-bottom: 200px; /* Add more space for mobile */
    }
  }
</style>

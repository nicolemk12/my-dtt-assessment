src/Pages/FinancialTips.vue
<template>
    <div>
      <div class="container">
        <main>
          <div class="back-wrapper">
           <router-link class="back-class" to="/">
            <img class="back-button" src="../../assets/images/ic_back_grey.png" alt="back">
             <a class="back-text">Back to overview</a>
            </router-link>
          </div>
          <div class="survey-link">
            <h3>Can You Finance Your Move?</h3>
            <p>Take our quick survey to find out if you're ready to finance your move!</p>
            <router-link to="/finance-survey" id="surveyLink">Take the Survey</router-link>
          </div>
  
          <section class="financial-tips">
            <h2>Financial Tips for Moving</h2>
            <p>Moving is exciting, but it can also be a major financial challenge. With careful planning and some smart decisions, you can ease the financial burden and make your move more affordable. Here are some practical tips to help you save money while staying organized:</p>
  
            <h3>1. Estimate the Cost</h3>
            <p>Before contacting moving companies, use online moving cost calculators to get a rough estimate of how much your move should cost. These tools provide a solid baseline and help you avoid overpaying for moving services. Once you have an idea of the average cost, request quotes from several companies. Having this information ensures you can identify and avoid bids that are significantly higher than necessary.</p>
  
            <h3>2. Avoid Buying Supplies</h3>
            <p>Purchasing boxes, bubble wrap, and packing paper can quickly add up. Instead, ask friends, neighbors, or local businesses for spare boxes and supplies. Many grocery and appliance stores are happy to give away used boxes from their deliveries. Get creative by using items you already have—towels, blankets, and clothing can protect fragile items just as well as bubble wrap, saving you both money and waste.</p>
  
            <h3>3. Host a Sale</h3>
            <p>A yard sale can help you declutter while earning extra money for your move. Sell clothes, furniture, and other items you no longer need or want to take with you. By reducing the number of belongings, you’ll save on moving costs, whether by needing fewer movers or a smaller truck. Plus, the profits from your sale can go directly toward moving expenses.</p>
  
            <h3>4. Utilize Media Mail</h3>
            <p>If you have a large collection of books, consider using the United States Postal Service’s Media Mail option. This affordable shipping method allows you to send books and similar items at a fraction of the cost of standard shipping. By mailing your books ahead of time, you’ll free up space in your moving truck for other essential items while saving on overall costs.</p>
  
            <h3>5. Establish a Plan B</h3>
            <p>Unexpected delays can happen, so it’s wise to have a backup plan in case your move doesn’t go as scheduled. Arrange to stay with friends or family if your new home isn’t ready on time. This can save you the cost of last-minute hotel bookings. Additionally, look for moving companies that offer flexible scheduling without additional fees for changes.</p>
  
            <h3>6. Don’t Pick the Lowest Bidding Movers</h3>
            <p>While it might be tempting to choose the cheapest movers, a low bid can sometimes signal poor service. Choosing a more reputable moving company, even if their quote is higher, can save you money in the long run by ensuring your belongings arrive safely and on time. Damaged or lost items could cost far more to replace than the difference in moving quotes.</p>
  
            <h3>7. Pack Strategically</h3>
            <p>Efficient packing can significantly reduce your moving costs. Nest smaller items inside larger ones and use all available space in each box. This reduces the total number of boxes you’ll need to move and can even allow for a smaller, more affordable moving truck. Strategic packing saves space, time, and money.</p>
  
            <h3>8. Cancel Your Utilities</h3>
            <p>To avoid overlapping charges for utilities, cancel services at your old home and schedule activation at your new address. Some providers offer discounts or deals for new accounts, so take this opportunity to shop around for better rates. You may even find offers for waived installation fees or bundled services that save you money.</p>
  
            <h3>9. Ask for a Deal</h3>
            <p>Don’t be afraid to negotiate with moving companies. Many movers are open to providing discounts or matching competitor rates. Take the time to get quotes from multiple providers, and then use the best offer to negotiate a better deal. This small effort could result in significant savings on your move.</p>
  
            <h3>10. Consider the Cost of Moving Yourself</h3>
            <p>If you’re on a tight budget, renting a moving truck and handling the move yourself might be the most affordable option. Compare the costs of DIY moving with hiring professional movers, including the rental, gas, and time commitment. In some cases, moving yourself can save hundreds or even thousands of dollars, depending on the distance and size of your move.</p>
          </section>
        </main>
  
        <footer class="credit">
          <p>
            Content and inspiration sourced from <a href="https://www.forbes.com/home-improvement/moving-services/save-money-moving/" target="_blank" rel="noopener noreferrer">Forbes: Save Money Moving</a>.
          </p>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FinancialTips'
  };
  </script>
  
  <style scoped>
  /* General Styling */
  .container {
    font-family: 'Montserrat', 'Open Sans', sans-serif;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px;
    width: 80%;
    max-width: 1000px; /* Restrict the max width on larger screens */
  }
  
  /* Back Button Styling */
  .back-class {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-top: 20px;
    max-width: 600px;
  }
  
  .back-button {
    width: 16px;
    height: 16px;
  }
  
  .back-text {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-left: 10px;
    text-decoration: none;
  }
  
  /* Survey Link Styling */
  .survey-link {
    margin-top: 40px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 40px auto;
  }
  
  .survey-link h3 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  #surveyLink {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  
  #surveyLink:hover {
    background-color: #0056b3;
  }
  
  /* Financial Tips Section */
  .financial-tips {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
  }
  
  .financial-tips h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .financial-tips h3 {
    margin-top: 20px;
    font-size: 1.2em;
  }
  
  .financial-tips p {
    font-size: 1em;
    margin-bottom: 10px;
  }
  
  /* Footer Section */
  footer.credit {
    font-size: 0.9em;
    color: #777;
    margin-top: 40px;
    text-align: center;
  }
  
  footer.credit a {
    color: #067BC2;
    text-decoration: none;
  }
  
  footer.credit a:hover {
    text-decoration: underline;
  }
  
  /* Mobile Styles */
  @media screen and (max-width: 750px) {
    .container {
      width: 95%;
      margin-top: 20px;
    }
  
    .back-class {
      transform: translateX(0); /* Center it left-leaning */
      margin: 20px 20px 0 10px; /* Keep it close to the left */
      max-width: none; /* Let it take the full width for mobile */
    }
  
    .survey-link, .financial-tips {
      margin-top: 20px;
      padding: 15px;
    }
  
    .survey-link h3 {
      font-size: 1.3em;
    }
  
    .financial-tips h2 {
      font-size: 1.7em;
    }
  
    .financial-tips h3 {
      font-size: 1.1em;
    }
  
    footer.credit {
      font-size: 0.8em;
    }
  }
  </style>
  
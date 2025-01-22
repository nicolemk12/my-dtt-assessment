<template>
  <div class="container">
    <!-- Content Section -->
    <div class="content">
      <section id="home">
        <h1>Home Page</h1>
        <p>Explore our resources for a smoother moving experience.</p>
      </section>

      <!-- Move the image-container here -->
      <div class="image-container">
        <img :src="homepageImage" alt="Homepage Image" />
      </div>

      <!-- Finance Tips Section -->
       
      <div class="row">
        <div class="column">
          <h2>Finance Tips</h2>
          <p>Learn how to budget and save for your dream home with our expert advice.</p>
          <router-link to="/financial-tips" class="btn">Learn More</router-link>
        </div>
      </div>

      <!-- Moving Tips Section -->
      <section class="moving-tips">
        <h2>Tips for Moving</h2>
        <p>
          Packing up your life and moving down the street or across the country doesn’t have to be stressful.
          Follow these practical tips to ensure a smooth transition and settle into your new home with ease:
        </p>

        <div v-for="(tip, index) in movingTips" :key="index" class="tip">
          <h3>{{ index + 1 }}. {{ tip.title }}</h3>
          <p>{{ tip.content }}</p>
        </div>
      </section>
    </div>

    <!-- Footer Section -->
    <footer class="credit">
      <p>
        Content and inspiration sourced from
        <a
          href="https://www.realsimple.com/home-organizing/organizing/moving/moving-packing-tips"
          target="_blank"
          rel="noopener noreferrer"
        >
          Real Simple: Moving & Packing Tips
        </a>.
      </p>
    </footer>
  </div>
</template>

<script>
import homepageImageSrc from "../../assets/images/img_placeholder_house.png";
import "../../assets/style/style.css";

export default {
  name: "Home",
  data() {
    return {
      homepageImage: homepageImageSrc,
      movingTips: [
        {
          title: "Get rid of some stuff",
          content:
            "Packing all your belongings into boxes and bags can be overwhelming. Start by decluttering your home. Go through each room and make decisions about what to keep, donate, sell, or throw away. Be honest with yourself about what you actually use and need. This will not only reduce the amount of stuff you need to move but also make your new home feel less cluttered and more organized from the start.",
        },
        {
          title: "Make a moving folder",
          content:
            "Gather all your essential documents in one place to stay organized throughout the moving process. This should include new address information, moving contracts, rental or purchase agreements, and utility setup confirmations. Keep both digital and physical copies for backup. Having these documents handy will save time and prevent headaches if you need to reference something quickly on moving day or during your move.",
        },
        {
          title: "Pack as far in advance as possible",
          content:
            "Start packing non-essential items well before moving day. Begin with seasonal clothing, books, decorative items, and rarely used kitchenware. Label each box clearly with its contents and the room it belongs to. This will reduce last-minute stress and help ensure a smoother packing process. As moving day approaches, you’ll only need to worry about packing the items you use daily.",
        },
        {
          title: "Book early",
          content:
            "Whether you’re hiring a moving company, renting a truck, or scheduling cleaners for your old home, booking early is crucial. Moving services are often in high demand, especially during peak seasons. Early bookings ensure availability and often come with better pricing. Additionally, this gives you time to compare options and read reviews to make the best decision.",
        },
        {
          title: "Schedule utilities for your new place",
          content:
            "Contact utility providers well in advance to ensure essential services like electricity, water, internet, and gas are ready when you move into your new home. Similarly, schedule disconnection of services at your old place to avoid overlapping charges. Keep a record of all setup and cancellation confirmations, so you have documentation in case any issues arise.",
        },
        {
          title: "Keep the essentials with you",
          content:
            "Pack a bag or box with items you’ll need immediately during and after the move, such as toiletries, medications, a change of clothes, phone chargers, important documents, and basic kitchen supplies. Having these essentials on hand ensures you’re prepared for the first night in your new home, even if unpacking is delayed or items are hard to find.",
        },
        {
          title: "Invest in equipment",
          content:
            "Having the right tools can make the moving process significantly easier. Stock up on supplies like sturdy boxes, packing tape, permanent markers, and bubble wrap. For heavier items, rent or buy a furniture dolly, moving blankets, and tie-down straps to secure them during transport. These investments can prevent damage to your belongings and save time and effort on moving day.",
        },
        {
          title: "Get a truck with a loading ramp",
          content:
            "If you’re handling the move yourself, renting a truck with a loading ramp is a game-changer. While it might cost a little more, the time and energy saved when loading and unloading heavy furniture and boxes will more than make up for the extra expense. A ramp can also reduce the risk of injuries and make the move feel less physically demanding.",
        },
        {
          title: "Measure, measure, measure",
          content:
            "Before moving, take accurate measurements of your furniture, doorways, hallways, and staircases in both your old and new homes. This will help you plan how to move large items and avoid surprises. Knowing what fits where can save time, prevent frustration, and reduce the chance of damaging your furniture or walls during the move.",
        },
        {
          title: "Snap lots of pics",
          content:
            "Take photos of your old home before moving out and your new home before moving in. These pictures can serve as proof of the condition of both properties in case of disputes with landlords, property managers, or buyers. Additionally, snapping pictures of how electronics are set up or furniture is arranged can make reassembly and decorating in your new home much easier.",
        },
        {
          title: "Unpack on a deadline",
          content:
            "Set a realistic timeline for unpacking to avoid living out of boxes for weeks. Focus on essentials first, such as kitchen items, bedroom necessities, and bathroom supplies. Break the process into smaller tasks, like unpacking one room per day or one box at a time. Having a deadline will help you stay motivated and get settled into your new home faster.",
        },
        {
          title: "Deal with packing supplies responsibly",
          content:
            "Once you’re unpacked, you’ll probably have a lot of empty boxes, bubble wrap, and packing materials. Instead of throwing them away, consider donating them to friends, neighbors, or local community groups who might be planning a move. Alternatively, check if your moving company will take them back for recycling. This helps keep your space tidy and is more environmentally friendly.",
        },
      ],
    };
  },
};
</script>

  <style scoped>
  /* Add your custom styles here */
  .container {
    font-family: var(--font-family);
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 50%;
    margin: 0 auto; 
    margin-top: 40px;
    align-items: center; 
  }
  
  h1 {
    font-family: var(--font-family);
    font-size: 32px;
    margin-bottom: 10px;
  }
  
  p {
    font-family: var(--font-family-secondary);
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .tip {
    margin-bottom: 20px; 
  }

  .image-container {
     display: flex; 
     justify-content: center;
     width: 100%; 
     padding: 20px;
     
   }

   .image-container img {
     max-width: 100%;
     height: auto;
   }
  
  .row {
    margin-top: 40px;
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .btn {
   display: inline-block;
   padding: 10px 20px;
   background-color: #EB5440;
   color: rgb(255, 255, 255);
   text-decoration: none;
   font-weight: 600;
   border-radius: 5px;
   text-align: center;
  margin-top: 20px;
  }
  
  .btn:hover {
    background-color: #a13123;
  }
  .moving-tips {
    margin-top: 40px;
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  footer.credit {
    color: var(--secondary-text);
    margin-top: 40px;
    font-size: 0.9em;
    color: #777;
  }
  
  footer.credit a {
    color: var(--hyperlink);
  }

  /* Mobile Styles */
@media screen and (max-width: 750px) {
  .container {
    width: 90%;
    margin-top: 20px;
  }

  h1 {
    font-family: var(--font-family);
    font-weight: bold;
    display: flex;
    justify-content: center;
    font-size: 28px;
    margin-top: 5px;
}

  p {
    font-size: 12px;
  }

  .image-container {
    padding: 10px;
  }

  .moving-tips, .row {
    padding: 10px;
    margin-top: 20px;
  }
  
  footer.credit {
    font-size: 0.8em;
  }
}
  </style>
  
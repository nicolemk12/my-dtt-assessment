<template>
    <div class="wrapper">
        <div class="top">
            <h1 class="toptext">About</h1>
        </div>

        <div class="text">
            <h1>About DTT Real Estate</h1>
        </div>

        <p class="firsttext">
            You know how overwhelming the search for housing can be—from understanding leases and navigating budgets to finding a place that truly feels like home. 
        That’s why this website was created: to make the process easier, more transparent, and—dare I say it—even enjoyable. 
        Here, you’ll find a wealth of resources designed with you in mind. 
        Whether you’re a first-time renter, a family looking for an upgrade, or someone planning to downsize, this platform offers something for everyone. Dive into the listings, connect with trustworthy landlords and housing experts, and join a vibrant community ready to help you succeed.
        </p>

        <p class="secondtext">
            Explore our latest property listings tailored to various preferences and budgets. Use our search tools to efficiently filter by size and price.
        </p>

            <h1 class="footertext">Design and Development</h1>

        <div class="footer">
            <img class="footerlogo" src="../../assets/images/logo_dtt.png" alt="DTT Logo">
            <div class="footerinfo">
                <p>By DTT</p>
                <a href="https://www.d-tt.nl" class="footerlink">www.d-tt.nl</a>
            </div>

        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
}

.top {
    display: none;
}

.text {
    width: 70%;
    margin: 3% 15% 0 15%;
}

.firsttext {
    width: 70%;
    margin: 1% 15% 1% 15%;
    font-family: var(--font-family);
    line-height: 1.5em;
    color: var(--secondary-text);
}

.secondtext {
    width: 70%;
    margin: 0 15% 3% 15%;
    font-family: var(--font-family);
    line-height: 1.5em;
    color: var(--secondary-text);
}

.footertext {
    width: 70%;
    margin: 0 15% 1% 15%;
}

.footer {
    display: flex;
    width: 70%;
    margin: 0 15% 0 15%;
}

.footerlogo {
    width: 30%;
    height: 30%;
    margin: 0 0 0 0;
}

.footerinfo {
    width: 100%;
    color: var(--secondary-text);
    margin: 0 0 0 2%;
    font-weight: 510;
}

.footerlink {
    text-decoration: none;
}

h1 {
    font-family: var(--font-family);
    font-size: 30px;
    font-weight: 550;
    color: #000000;
}

@media screen and (max-width: 750px) {


.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #F5F5F5;
    }
.top {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 4% 0 5% 0;
}

.text {
    width: 90%;
    margin: 0 3% 0 3%;
}

.firsttext, .secondtext {
    width: 90%;
    margin: 0 3% 5% 3%;
    font-family: var(--font-family);
    line-height: 1.5em;
    color: var(--secondary-text);
}

.footertext {
    width: 90%;
    margin: 0 3% 1% 3%;
}

.footer {
    display: flex;
    width: 90%;
    margin: 0 3% 0 3%;
}

.footerlogo {
    width: 40%;
    height: 40%;
    margin: 0 0 0 0;
}

h1 {
    font-family: var(--font-family);
    font-size: 32px;
    font-weight: 550;
    color: #000000;
}

}
</style>
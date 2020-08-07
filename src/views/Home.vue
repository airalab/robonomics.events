<template>
  <div class="screen" id="index-intro">
    <div id="index-intro--content">
      <h1>Robonomics Community Events</h1>
      <section>
        <p>
          Be involved in Robonomics project! The core dev team has several
          events to join for everyone in the community.
        </p>
      </section>
      <h4>Current and upcoming events</h4>
      <section>
        <ul>
          <li>
            <router-link
              :to="{ name: 'liquidity' }"
              style="color: #fff; font-weight: bold;"
              >Liquidity Staking incentive</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'mm' }"
              style="color: #fff; font-weight: bold;"
              >Market makers incentive</router-link
            >
            <!-- <a
              href="https://docs.google.com/spreadsheets/d/1McClwILWjbWX_KIvGKqtLo0ZseWrWPL20rHjnDKY1YQ/edit#gid=925814823"
              target="_blank"
              style="color: #fff; font-weight: bold;"
              >Market makers incentive</a
            > -->
          </li>
          <li>
            <router-link
              :to="{ name: 'collators' }"
              style="color: #fff; font-weight: bold;"
              >Parachain collators incentive</router-link
            >
            <!-- <a
              href="https://docs.google.com/spreadsheets/d/1McClwILWjbWX_KIvGKqtLo0ZseWrWPL20rHjnDKY1YQ/edit#gid=1991395529"
              target="_blank"
              style="color: #fff; font-weight: bold;"
              >Parachain collators incentive</a
            > -->
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

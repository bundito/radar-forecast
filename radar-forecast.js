/*
 *  Copyright (C) 2018 Scott Harvey <scott@spharvey.me>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

class RadarForecast extends HTMLElement {
 

  set hass(hass) {

    var high = Math.round(hass.states[this.config.high].state);
    var low = Math.round(hass.states[this.config.low].state);

    this.content.innerHTML = `
      <strong>${this.config.title}</strong>
      <br>
      <div style='box-shadow: 0 4px 8px 0 rgba(0, 0.1, 0.1, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'>
      <img style='height: 100%; width: 100%; object-fit: contain' src="${this.config.image}">
      </div>
      <br>
      <strong>High: </strong>${high}&deg;${this.config.units}&nbsp;&#x2758;&nbsp;<strong>Low: </strong>${low}&deg;${this.config.units}&nbsp;&#x2758;&nbsp;${hass.states[this.config.summary].state}
      <br>
      <br>
      <strong>Forecast: </strong>${hass.states[this.config.forecast].state}

      </div>
      </ha-card>
    `;
  } // end of HASS setter

// ---- display section ends at close brace above ----

 // <strong>High: </strong>${hass.states[this.config.high].state}&nbsp;|&nbsp;<strong>Low: <strong>${hass.states[this.config.low].state}

// Unlke hass, the setConfig function sets up the card and only runs when the card is first
// set up or when the config changes. 

  setConfig(config) {
    if (!config.image) {
      throw new Error('Please provide an image link!');
    } 
    this.config = config;
    
    const card = document.createElement('ha-card');
    this.content = document.createElement('div');
    this.content.style.padding = '0 16px 16px';
    card.appendChild(this.content);
    this.appendChild(card);
    
  } // end of setConfig

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
} // end of class

customElements.define('radar-forecast', RadarForecast);
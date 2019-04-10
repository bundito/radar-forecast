# radar-forecast
Adding an animated radar map plus compact forecast information from Dark Sky to your Home Assistant display.

![radar-forecast](/radar-forecast.png)

## Step 1: Getting Your Radar Image
This is the trickiest part. It's not hard, just requires a few steps.

1. Go to https://www.wunderground.com/weather-radar
2. Use the drop-down menus above the map to find your preferred radar station
   * The sequence goes **Region** -> **Radar Stations**
3. Once you've chosen a station, you'll get a complex and detailed page of a map, with lots of options.
   * Feel free to play with the options until you get a view you like.
   * Use the white "Play" button at the top to see the animation
   * "Zoom" is an interesting option, if you want to see a closer view of the map
   * Keep the animation frames at 6 to avoid using a ton of bandwidth
4. When you've got your options set, click the **Save Image** link in the bottom center of the screen.
5. You'll get a page showing nothing but your map with the chosen options.
6. Copy this URL, but be warned... it's obscenely long. Make sure you get the *entire* URL.
   * Try pasting it into an empty browser tab to test.
7. Once you're sure it's right and it works, I suggest running it through [Bitly](https://bitly.com) to shorten it to something reasonable.
   * https://radblast.wunderground.com/cgi-bin/radar/WUNIDS_map?station=MDW&brand=wui&num=1&delay=15&type=TR0&frame=0&scale=0.75&noclutter=0&showstorms=0&mapx=400&mapy=240&centerx=400&centery=240&transx=0&transy=0&showlabels=1&severe=0&rainsnow=1&lightning=0&smooth=0&rand=25725764&lat=0&lon=0&label=you
   * becomes
   * https://bit.ly/2QtHrqm
 8. This is your image URL. Don't lose it or you'll have to start over.
 
 ## Sensor Setup
 Version 0.83.1 introduced a minor change to the Dark Sky sensor. Some sensors were renamed with `_0` at the end, with "Day 0" meaning "today". So you've got to make sure your Dark Sky sensor setup now looks like this:
 
 ~~~
 
 - platform: darksky
   api_key: xxxxxxxxx
   forecast:
    - 0           <-------- ADD THIS
    - 1
    - 2
    - 3
    - 4
    - 5
 (and so on)
 ~~~
 
 ## Step 3: Card Setup
 This is the easy bit.
 
 - Copy the `radar-forecast.js` file from this repository and drop it in your `<config>/www` directory.
 - Add the required include lines at the top of your `ui-lovelace.yaml` file:
----
    - url: /local/radar-forecast.js?v=1
      type: js
----
  
To place your card in your display, here's the configuration:

~~~~
- type: custom:radar-forecast
  image: https://bit.ly/2FNnlTT
  title: Current ORD Forecast
  forecast: sensor.dark_sky_daily_summary
  high: sensor.dark_sky_daytime_high_temperature_0d       <-------
  low: sensor.dark_sky_overnight_low_temperature_0d       <-------
  summary: sensor.dark_sky_summary
  units: F
~~~~

**Version 0.83.1 change** The high and low temperatures now need **`_0`** added to the end of their definition. If you don't change or include this, the card is going to fail and blank out your page. That's not cool at all.

Note that we're assuming you've already got all the required Dark Sky sensors imported in your `configuration.yaml`. If you need help with this part, check out the [Dark Sky Sensor](https://www.home-assistant.io/components/sensor.darksky/) component directions.

`title` is a freeform field - put in anything you like.
`units` is a dumb field - put in `F` or `C` or whatever you like. It's just text.

Reload your display and you should have an animated radar card. 

**Version 0.91.0 change** The high and low temperatures now need **`_0d`** added to the end of their definition. If you don't change or include this, the card is going to fail and blank out your page. This is similar to the change required in 0.83.1.

Reload your display and you should have an animated radar card. 

### Troubleshooting
The thing most likely to give you a headache is getting that giant URL. All I can suggest is follow the directions and use your common sense. When you get a plain page with just your animated map, you've got it. Make sure you get every letter of that giant URL.

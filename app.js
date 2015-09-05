/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
  app = express(),
  bluemix = require('./config/bluemix'),
  watson = require('watson-developer-cloud'),
  extend = require('util')._extend,
  fs = require('fs'),
  dummy_text = fs.readFileSync('mobydick.txt');


// Bootstrap application settings
require('./config/express')(app);

// if bluemix credentials exists, then override local
var credentials = extend({
    version: '',
    url: '',
    username: '',
    password: ''
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES

// Create the service wrapper
var personalityInsights = new watson.personality_insights(credentials);

// render index page
app.get('/', function(req, res) {
  res.render('index', { content: dummy_text });
});

app.post('/', function(req, res) {
  console.log(req.body);
  personalityInsights.profile(req.body, function(err, profile) {
    if (err) {
      if (err.message){
        err = { error: err.message };
      }
      return res.status(err.code || 500).json(err || 'Error processing the request');
    }
    else
      return res.json(profile);
  });
});

app.post('/map', function(req, res) {
  personalityInsights.profile(req.body, function(err, profile) {
    if (err) {
      if (err.message){
        err = { error: err.message };
      }
      return res.status(err.code || 500).json(err || 'Error processing the request');
    }
    else
      return res.json(profile);
  });
});

app.get('/match', function(req, res) {

  req.params.m1 = req.params.m1 || '{"id":"*UNKNOWN*","source":"*UNKNOWN*","word_count":2211,"word_count_message":"There were 2,211 words in the input. We need a minimum of 3,500, preferably 6,000 or more, to compute statistically significant estimates","processed_lang":"en","tree":{"id":"r","name":"root","children":[{"id":"personality","name":"Big 5 ","children":[{"id":"Openness_parent","name":"Openness","category":"personality","percentage":0.9507155582712544,"children":[{"id":"Openness","name":"Openness","category":"personality","percentage":0.9507155582712544,"sampling_error":0.05564544696,"children":[{"id":"Adventurousness","name":"Adventurousness","category":"personality","percentage":0.7475611949505441,"sampling_error":0.04796580476},{"id":"Artistic interests","name":"Artistic interests","category":"personality","percentage":0.17290875336991474,"sampling_error":0.09840645164},{"id":"Emotionality","name":"Emotionality","category":"personality","percentage":0.298727476191873,"sampling_error":0.045154573600000004},{"id":"Imagination","name":"Imagination","category":"personality","percentage":0.9433641885609083,"sampling_error":0.059816341120000005},{"id":"Intellect","name":"Intellect","category":"personality","percentage":0.9379534778663756,"sampling_error":0.05220371896},{"id":"Liberalism","name":"Authority-challenging","category":"personality","percentage":0.9451374662308387,"sampling_error":0.0787720356}]},{"id":"Conscientiousness","name":"Conscientiousness","category":"personality","percentage":0.5039300941504715,"sampling_error":0.07165785748,"children":[{"id":"Achievement striving","name":"Achievement striving","category":"personality","percentage":0.4579032284512129,"sampling_error":0.09326581296},{"id":"Cautiousness","name":"Cautiousness","category":"personality","percentage":0.8552491854811621,"sampling_error":0.08616629972},{"id":"Dutifulness","name":"Dutifulness","category":"personality","percentage":0.15752566577808502,"sampling_error":0.05680072784},{"id":"Orderliness","name":"Orderliness","category":"personality","percentage":0.2317771227796233,"sampling_error":0.06629331368000001},{"id":"Self-discipline","name":"Self-discipline","category":"personality","percentage":0.15172577367759338,"sampling_error":0.04382118812},{"id":"Self-efficacy","name":"Self-efficacy","category":"personality","percentage":0.8125057793639066,"sampling_error":0.08693714524}]},{"id":"Extraversion","name":"Extraversion","category":"personality","percentage":0.16743429560815692,"sampling_error":0.05262699212,"children":[{"id":"Activity level","name":"Activity level","category":"personality","percentage":0.026483849435133697,"sampling_error":0.07288465064},{"id":"Assertiveness","name":"Assertiveness","category":"personality","percentage":0.21283353538817956,"sampling_error":0.07796783516},{"id":"Cheerfulness","name":"Cheerfulness","category":"personality","percentage":0.07779802282474485,"sampling_error":0.09766533404},{"id":"Excitement-seeking","name":"Excitement-seeking","category":"personality","percentage":0.031019624496975623,"sampling_error":0.07739312844},{"id":"Friendliness","name":"Outgoing","category":"personality","percentage":0.052310388783907945,"sampling_error":0.07060719684},{"id":"Gregariousness","name":"Gregariousness","category":"personality","percentage":0.015836194526102645,"sampling_error":0.054460931159999997}]},{"id":"Agreeableness","name":"Agreeableness","category":"personality","percentage":0.1309176279233938,"sampling_error":0.09150791084,"children":[{"id":"Altruism","name":"Altruism","category":"personality","percentage":0.14314555980868052,"sampling_error":0.06630805812},{"id":"Cooperation","name":"Cooperation","category":"personality","percentage":0.6991082864898702,"sampling_error":0.07542910259999999},{"id":"Modesty","name":"Modesty","category":"personality","percentage":0.029949489854718302,"sampling_error":0.051854124960000005},{"id":"Morality","name":"Uncompromising","category":"personality","percentage":0.12950094675644314,"sampling_error":0.059150285639999994},{"id":"Sympathy","name":"Sympathy","category":"personality","percentage":0.988032387028434,"sampling_error":0.0916498164},{"id":"Trust","name":"Trust","category":"personality","percentage":0.13939256931890254,"sampling_error":0.05171918492}]},{"id":"Neuroticism","name":"Emotional range","category":"personality","percentage":0.4191047135177268,"sampling_error":0.0841044178,"children":[{"id":"Anger","name":"Fiery","category":"personality","percentage":0.43158209688631544,"sampling_error":0.08834904016},{"id":"Anxiety","name":"Prone to worry","category":"personality","percentage":0.1644855429052556,"sampling_error":0.05141376412},{"id":"Depression","name":"Melancholy","category":"personality","percentage":0.3316707274189353,"sampling_error":0.054265146119999996},{"id":"Immoderation","name":"Immoderation","category":"personality","percentage":0.20248493442586335,"sampling_error":0.04974423864},{"id":"Self-consciousness","name":"Self-consciousness","category":"personality","percentage":0.3707520358860429,"sampling_error":0.05267397636},{"id":"Vulnerability","name":"Susceptible to stress","category":"personality","percentage":0.2502119048511144,"sampling_error":0.08031894076}]}]}]},{"id":"needs","name":"Needs","children":[{"id":"Ideal_parent","name":"Ideal","category":"needs","percentage":0.022413033084928397,"children":[{"id":"Challenge","name":"Challenge","category":"needs","percentage":0.04207240032883603,"sampling_error":0.078681255},{"id":"Closeness","name":"Closeness","category":"needs","percentage":0.055490186602770206,"sampling_error":0.07778854512},{"id":"Curiosity","name":"Curiosity","category":"needs","percentage":0.06721761198872232,"sampling_error":0.11149643532},{"id":"Excitement","name":"Excitement","category":"needs","percentage":0.03864801075160132,"sampling_error":0.10186707596},{"id":"Harmony","name":"Harmony","category":"needs","percentage":0.4481117756345261,"sampling_error":0.1012082272},{"id":"Ideal","name":"Ideal","category":"needs","percentage":0.022413033084928397,"sampling_error":0.09183725316},{"id":"Liberty","name":"Liberty","category":"needs","percentage":0.10842188146505852,"sampling_error":0.13629254863999998},{"id":"Love","name":"Love","category":"needs","percentage":0.2613144360292408,"sampling_error":0.09310442776},{"id":"Practicality","name":"Practicality","category":"needs","percentage":0.33819191265217813,"sampling_error":0.08133299836},{"id":"Self-expression","name":"Self-expression","category":"needs","percentage":0.04897972423549285,"sampling_error":0.07606954044},{"id":"Stability","name":"Stability","category":"needs","percentage":0.045710980083320946,"sampling_error":0.09902254167999999},{"id":"Structure","name":"Structure","category":"needs","percentage":0.041799741826534086,"sampling_error":0.07454023536}]}]},{"id":"values","name":"Values","children":[{"id":"Conservation_parent","name":"Conservation","category":"values","percentage":0.029023918019099572,"children":[{"id":"Conservation","name":"Conservation","category":"values","percentage":0.029023918019099572,"sampling_error":0.06478851732},{"id":"Openness to change","name":"Openness to change","category":"values","percentage":0.9588786386017498,"sampling_error":0.06049861548},{"id":"Hedonism","name":"Hedonism","category":"values","percentage":0.32357488572180204,"sampling_error":0.12806277544},{"id":"Self-enhancement","name":"Self-enhancement","category":"values","percentage":0.46766796894424184,"sampling_error":0.09597471576},{"id":"Self-transcendence","name":"Self-transcendence","category":"values","percentage":0.7694947212735894,"sampling_error":0.0735369558}]}]}]}}';
  req.params.m2 = req.params.m2 || '{"id":"*UNKNOWN*","source":"*UNKNOWN*","word_count":2211,"word_count_message":"There were 2,211 words in the input. We need a minimum of 3,500, preferably 6,000 or more, to compute statistically significant estimates","processed_lang":"en","tree":{"id":"r","name":"root","children":[{"id":"personality","name":"Big 5 ","children":[{"id":"Openness_parent","name":"Openness","category":"personality","percentage":0.9507155582712544,"children":[{"id":"Openness","name":"Openness","category":"personality","percentage":0.9107155582712544,"sampling_error":0.05564544696,"children":[{"id":"Adventurousness","name":"Adventurousness","category":"personality","percentage":0.7475611949505441,"sampling_error":0.04796580476},{"id":"Artistic interests","name":"Artistic interests","category":"personality","percentage":0.17290875336991474,"sampling_error":0.09840645164},{"id":"Emotionality","name":"Emotionality","category":"personality","percentage":0.298727476191873,"sampling_error":0.045154573600000004},{"id":"Imagination","name":"Imagination","category":"personality","percentage":0.9433641885609083,"sampling_error":0.059816341120000005},{"id":"Intellect","name":"Intellect","category":"personality","percentage":0.9379534778663756,"sampling_error":0.05220371896},{"id":"Liberalism","name":"Authority-challenging","category":"personality","percentage":0.9451374662308387,"sampling_error":0.0787720356}]},{"id":"Conscientiousness","name":"Conscientiousness","category":"personality","percentage":0.8039300941504715,"sampling_error":0.07165785748,"children":[{"id":"Achievement striving","name":"Achievement striving","category":"personality","percentage":0.4579032284512129,"sampling_error":0.09326581296},{"id":"Cautiousness","name":"Cautiousness","category":"personality","percentage":0.8552491854811621,"sampling_error":0.08616629972},{"id":"Dutifulness","name":"Dutifulness","category":"personality","percentage":0.15752566577808502,"sampling_error":0.05680072784},{"id":"Orderliness","name":"Orderliness","category":"personality","percentage":0.2317771227796233,"sampling_error":0.06629331368000001},{"id":"Self-discipline","name":"Self-discipline","category":"personality","percentage":0.15172577367759338,"sampling_error":0.04382118812},{"id":"Self-efficacy","name":"Self-efficacy","category":"personality","percentage":0.8125057793639066,"sampling_error":0.08693714524}]},{"id":"Extraversion","name":"Extraversion","category":"personality","percentage":0.36743429560815692,"sampling_error":0.05262699212,"children":[{"id":"Activity level","name":"Activity level","category":"personality","percentage":0.026483849435133697,"sampling_error":0.07288465064},{"id":"Assertiveness","name":"Assertiveness","category":"personality","percentage":0.21283353538817956,"sampling_error":0.07796783516},{"id":"Cheerfulness","name":"Cheerfulness","category":"personality","percentage":0.07779802282474485,"sampling_error":0.09766533404},{"id":"Excitement-seeking","name":"Excitement-seeking","category":"personality","percentage":0.031019624496975623,"sampling_error":0.07739312844},{"id":"Friendliness","name":"Outgoing","category":"personality","percentage":0.052310388783907945,"sampling_error":0.07060719684},{"id":"Gregariousness","name":"Gregariousness","category":"personality","percentage":0.015836194526102645,"sampling_error":0.054460931159999997}]},{"id":"Agreeableness","name":"Agreeableness","category":"personality","percentage":0.4409176279233938,"sampling_error":0.09150791084,"children":[{"id":"Altruism","name":"Altruism","category":"personality","percentage":0.14314555980868052,"sampling_error":0.06630805812},{"id":"Cooperation","name":"Cooperation","category":"personality","percentage":0.6991082864898702,"sampling_error":0.07542910259999999},{"id":"Modesty","name":"Modesty","category":"personality","percentage":0.029949489854718302,"sampling_error":0.051854124960000005},{"id":"Morality","name":"Uncompromising","category":"personality","percentage":0.12950094675644314,"sampling_error":0.059150285639999994},{"id":"Sympathy","name":"Sympathy","category":"personality","percentage":0.988032387028434,"sampling_error":0.0916498164},{"id":"Trust","name":"Trust","category":"personality","percentage":0.13939256931890254,"sampling_error":0.05171918492}]},{"id":"Neuroticism","name":"Emotional range","category":"personality","percentage":0.4191047135177268,"sampling_error":0.0841044178,"children":[{"id":"Anger","name":"Fiery","category":"personality","percentage":0.43158209688631544,"sampling_error":0.08834904016},{"id":"Anxiety","name":"Prone to worry","category":"personality","percentage":0.1644855429052556,"sampling_error":0.05141376412},{"id":"Depression","name":"Melancholy","category":"personality","percentage":0.3316707274189353,"sampling_error":0.054265146119999996},{"id":"Immoderation","name":"Immoderation","category":"personality","percentage":0.20248493442586335,"sampling_error":0.04974423864},{"id":"Self-consciousness","name":"Self-consciousness","category":"personality","percentage":0.3707520358860429,"sampling_error":0.05267397636},{"id":"Vulnerability","name":"Susceptible to stress","category":"personality","percentage":0.2502119048511144,"sampling_error":0.08031894076}]}]}]},{"id":"needs","name":"Needs","children":[{"id":"Ideal_parent","name":"Ideal","category":"needs","percentage":0.022413033084928397,"children":[{"id":"Challenge","name":"Challenge","category":"needs","percentage":0.04207240032883603,"sampling_error":0.078681255},{"id":"Closeness","name":"Closeness","category":"needs","percentage":0.055490186602770206,"sampling_error":0.07778854512},{"id":"Curiosity","name":"Curiosity","category":"needs","percentage":0.06721761198872232,"sampling_error":0.11149643532},{"id":"Excitement","name":"Excitement","category":"needs","percentage":0.03864801075160132,"sampling_error":0.10186707596},{"id":"Harmony","name":"Harmony","category":"needs","percentage":0.4481117756345261,"sampling_error":0.1012082272},{"id":"Ideal","name":"Ideal","category":"needs","percentage":0.022413033084928397,"sampling_error":0.09183725316},{"id":"Liberty","name":"Liberty","category":"needs","percentage":0.10842188146505852,"sampling_error":0.13629254863999998},{"id":"Love","name":"Love","category":"needs","percentage":0.2613144360292408,"sampling_error":0.09310442776},{"id":"Practicality","name":"Practicality","category":"needs","percentage":0.33819191265217813,"sampling_error":0.08133299836},{"id":"Self-expression","name":"Self-expression","category":"needs","percentage":0.04897972423549285,"sampling_error":0.07606954044},{"id":"Stability","name":"Stability","category":"needs","percentage":0.045710980083320946,"sampling_error":0.09902254167999999},{"id":"Structure","name":"Structure","category":"needs","percentage":0.041799741826534086,"sampling_error":0.07454023536}]}]},{"id":"values","name":"Values","children":[{"id":"Conservation_parent","name":"Conservation","category":"values","percentage":0.159023918019099572,"children":[{"id":"Conservation","name":"Conservation","category":"values","percentage":0.029023918019099572,"sampling_error":0.06478851732},{"id":"Openness to change","name":"Openness to change","category":"values","percentage":0.2588786386017498,"sampling_error":0.06049861548},{"id":"Hedonism","name":"Hedonism","category":"values","percentage":0.32357488572180204,"sampling_error":0.12806277544},{"id":"Self-enhancement","name":"Self-enhancement","category":"values","percentage":0.46766796894424184,"sampling_error":0.09597471576},{"id":"Self-transcendence","name":"Self-transcendence","category":"values","percentage":0.2694947212735894,"sampling_error":0.0735369558}]}]}]}}';

  var m1 = JSON.parse(req.params.m1);
  var m2 = JSON.parse(req.params.m2);
  
  /* 
  for(var i=0; i<b['p1']['tree']['children'][0]['children'].length; i++) {
    for(var j=0; j<b['p1']['tree']['children'][0]['children'][i]['children'].length; j++) {
      for(var k=0; k<b['p1']['tree']['children'][0]['children'][i]['children'][j]['children'].length; k++) {
      //console.log(b['p1']['tree']['children'][0]['children'][i]['children'][j]['name']+ b['p1']['tree']['children'][0]['children'][i]['children'][j]['percentage']);
        console.log(b['p1']['tree']['children'][0]['children'][i]['children'][j]['children'][k]['name']+ ',' +b['p1']['tree']['children'][0]['children'][i]['children'][j]['children'][k]['percentage']);
      }
    }
  }
  */
  var response = {};

  var overall_match_diff_avg = 0;
  var needs_match_diff_avg = 0;
  var values_match_diff_avg = 0;

  var m1_vals = [];
  var m2_vals = [];
  var match_vals = [];

  // overall
  console.log("--overall--")
  for(var i=0; i<m1['tree']['children'][0]['children'].length; i++) {
    for(var j=0; j<m1['tree']['children'][0]['children'][i]['children'].length; j++) {
      //console.log(b['p1']['tree']['children'][0]['children'][i]['children'][j]['name']+ ',' +b['p1']['tree']['children'][0]['children'][i]['children'][j]['percentage']);
      m1_vals.push(parseInt(m1['tree']['children'][0]['children'][i]['children'][j]['percentage']*100));
      m2_vals.push(parseInt(m2['tree']['children'][0]['children'][i]['children'][j]['percentage']*100));
      match_vals.push((m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1]) < 0 ? (m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1])*-1 : (m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1]));
      
      console.log(m1_vals[m1_vals.length-1] +","+ m2_vals[m2_vals.length-1]);
    }
  }

  for (var i=0; i<match_vals.length; i++) {
    overall_match_diff_avg += match_vals[i];
  }
  overall_match_diff_avg = 100-parseInt(overall_match_diff_avg/match_vals.length);
  response['overall'] = overall_match_diff_avg;

  // needs
  console.log("--needs--")
  var m1_vals = [];
  var m2_vals = [];
  var match_vals = [];

  for(var i=0; i<m1['tree']['children'][1]['children'].length; i++) {
    for(var j=0; j<m1['tree']['children'][1]['children'][i]['children'].length; j++) {
      //console.log(b['p1']['tree']['children'][0]['children'][i]['children'][j]['name']+ ',' +b['p1']['tree']['children'][0]['children'][i]['children'][j]['percentage']);
      m1_vals.push(parseInt(m1['tree']['children'][1]['children'][i]['children'][j]['percentage']*100));
      m2_vals.push(parseInt(m2['tree']['children'][1]['children'][i]['children'][j]['percentage']*100));
      match_vals.push((m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1]) < 0 ? (m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1])*-1 : (m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1]));

      console.log(m1_vals[m1_vals.length-1] +","+ m2_vals[m2_vals.length-1]);
    }
  }
  for (var i=0; i<match_vals.length; i++) {
    needs_match_diff_avg += match_vals[i];
  }
  needs_match_diff_avg = 100-parseInt(needs_match_diff_avg/match_vals.length);
  response['needs'] = needs_match_diff_avg;

  // values
  console.log("--values--")
  var m1_vals = [];
  var m2_vals = [];
  var match_vals = [];

  for(var i=0; i<m1['tree']['children'][2]['children'].length; i++) {
    for(var j=0; j<m1['tree']['children'][2]['children'][i]['children'].length; j++) {
      //console.log(b['p1']['tree']['children'][0]['children'][i]['children'][j]['name']+ ',' +b['p1']['tree']['children'][0]['children'][i]['children'][j]['percentage']);
      m1_vals.push(parseInt(m1['tree']['children'][2]['children'][i]['children'][j]['percentage']*100));
      m2_vals.push(parseInt(m2['tree']['children'][2]['children'][i]['children'][j]['percentage']*100));
      match_vals.push((m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1]) < 0 ? (m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1])*-1 : (m1_vals[m1_vals.length-1] - m2_vals[m1_vals.length-1]));
      
      console.log(m1_vals[m1_vals.length-1] +","+ m2_vals[m2_vals.length-1]);
    }
  }
  for (var i=0; i<match_vals.length; i++) {
    values_match_diff_avg += match_vals[i];
  }
  values_match_diff_avg = 100-parseInt(values_match_diff_avg/match_vals.length);
  response['values'] = values_match_diff_avg;

  return res.json(response);
});

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
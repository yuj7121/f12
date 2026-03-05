const sketch = (p) => {
  p.setup = function() {
    document.body.style['userSelect'] = 'none';
    let h = document.body.clientHeight;
    let c = p.createCanvas(p.windowWidth, document.body.scrollHeight);
    c.position(0, 0); // up at 0,0
    c.style('pointer-events', 'none'); // we cna now still interact yippeee

    p.frameRate(5);
    p.strokeWeight(0);
    p.colorMode(p.HSB, 360, 100, 100, 100)
  };

  const glitchChars = [".̶̸̶̭̝͇̈́ͮͥ", ".̴̶̖͎̙̑͊͐́̔ͪ̆́͢͞", ".̶̶̡̢̪̹̭̯̖̳̳̣͍̌͌̍̅̋̀̆̾ͪͫ͘͝", ".̶̸̢̡̡̱̜̩̒̌̏̀͜͞͝͠͝", ".̶̴̤͔ͧͫͯ̌ͩ̔̀͝͠", ".̷̷̡̤̍̂ͯͪ̎", ".̴̡͓ͭ̀̏ͤ͌ͥͬ́̀́̀͘͢͞", ".̵̶̶͙̮̠͚͑̉͗͊̂̀́́͜͜͞", ".̵̴̓͗̐̑ͯ͊́̀͜", ".̵̴̡̡͕̬̫͔͙͐ͨ̀̏͘͠͝"];

  p.glitch = function(x, y) {
    // this loops draws the glitch boxes
    for(i = 0; i < Math.random() * 10; i++) {
      const offset = 300;
      boxX = x + (Math.pow(Math.random() * 2 - 1, 9)) * offset;
      boxY = y + (Math.pow(Math.random() * 2 - 1, 9)) * offset;
      w = 1 + Math.random() * 10;
      h = 1 + Math.random() * 10;

      p.fill(Math.random() * 360, Math.random() > 0.1 ? 100 : 0, Math.random() > 0.1 ? 100 : 0, 100);
      p.rect(boxX + Math.random() * 3, boxY + Math.random() * 3, w, h);
      p.fill(Math.random() * 360, Math.random() > 0.1 ? 100 : 0, Math.random() > 0.1 ? 100 : 0, 100);
      p.rect(boxX - Math.random() * 3, boxY - Math.random() * 3, w, h);
      p.fill(0, 0, Math.random() > 0.8 ? 100 : 0, 100);
      p.rect(boxX, boxY, w, h);
    }

    // this loop draws the glitch characters
    for(i = 0; i < 10; i++) {
      const offset = 30;
      textX = x + (Math.pow(Math.random() * 2 - 1, 9)) * offset;
      textY = y + (Math.pow(Math.random() * 2 - 1, 9)) * offset;
      index = Math.random() * 10;
      index -= index % 10;
      p.fill("white");
      p.text(glitchChars[index], textX, textY);
      p.fill("black");
      p.text(glitchChars[index], textX + 1, textY + 1);
    }
  }

  p.draw = function() {
    if(!checked) return;
    p.clear();
    p.stroke(0);
    for(mouse of mouseHistory) {
      p.glitch(mouse.x, mouse.y + window.pageYOffset);
    }
  };
};

var myp5 = new p5(sketch);
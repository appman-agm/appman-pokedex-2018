export const calStrength = (item) => {
  let strength = 0;
  if (!item) return 0;
  else strength = item.length * 50;
  if (strength >= 100) return 100;
  else return strength;
};
export const calWeak = (item) => {
  if (!item) {
    return 0;
  } else {
    let weak = item.weaknesses;
    weak = item.length * 100;

    if (weak >= 100) return 100;
    else return weak;
  }
};

export const calHappiness = (item) => {
  let heal = calHp(item.hp);
  let damage = null;
  let weak = 0;

  if (!item.attacks) damage = 0;
  else
    item.attacks.forEach((attack) => {
      attack.damage === ""
        ? (damage += 0)
        : (damage += parseInt(attack.damage.replace(/[^a-zA-Z0-9]/g, "")));
    });

  let happy = (heal / 10 + damage / 10 + 10 - weak) / 5;
  let happyArray = [];
  for (let i = 0; i < Math.abs(Math.round(happy)); i++) {
    happyArray.push(i);
  }

  return happyArray;
};

export const calHp = (item) => {
  return item > 100 ? 100 : 0;
};

class SkillGenerator {
  constructor(rootElm, jsonPath, sectionTitle){
    this.rootElm = rootElm;
    this.jsonPath = jsonPath;
    this.sectionTitle = sectionTitle
    this.data = null
  }

  async init(){
    await this.updateSkill();
  }

  async getSkills (){
    const skillResponse = await fetch(`${this.jsonPath}`);
    return await skillResponse.json();
  }

  async updateSkill(){
    this.data = await this.getSkills();
    console.log(this.data);
    this.createSkillHtml();
  }

  createSkillHtml(){
    for(let data of this.data){
      const html = `
      <i class="${this.sectionTitle}-icon ${data.iconPropaty.join(' ')}"></i>
      <div class="${this.sectionTitle}-title">${data.boxTitle}</div>
      <p class="${this.sectionTitle}-text">${data.description}</p>
      `
      const sectionElm = document.createElement('div');
      sectionElm.className = `${this.sectionTitle}-box`;
      sectionElm.innerHTML = html;
      this.rootElm.appendChild(sectionElm);
      console.log(sectionElm);
    }
  }

}

const researchSkill = new SkillGenerator(document.getElementById('research'), '../json/research.json', 'research');
researchSkill.init();

const Skill = new SkillGenerator(document.getElementById('skills'), '../json/skill.json', 'skill');
Skill.init();

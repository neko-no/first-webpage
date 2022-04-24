class HobbyGenerator {
  constructor(rootElm, jsonPath, sectionTitle){
    this.rootElm = rootElm;
    this.jsonPath = jsonPath;
    this.sectionTitle = sectionTitle
    this.data = null
  }

  async init(){
    await this.updateHobbies();
  }

  async getHobbies (){
    const hobbyResponse = await fetch(`${this.jsonPath}`);
    return await hobbyResponse.json();
  }

  async updateHobbies(){
    this.data = await this.getHobbies();
    console.log(this.data);
    this.createHobbyHtml();
  }

  createHobbyHtml(){
    const wrapperElm = document.createElement('div');
    wrapperElm.className = `${this.sectionTitle}-wrapper`;

    const hobbiesContent = [];

    for(let data of this.data){
      hobbiesContent.push(`
      <section class="item ${data.className.join(' ')}">
        <a href="#">
          <img class="image" src="${data.imgSrc}" alt="${data.imgAlt}">
          <div class="category">${data.category}</div>
          <p class="description">${data.description}</p>
        </a>
      </section>
      `);
    }

    wrapperElm.innerHTML = hobbiesContent.join('');
    this.rootElm.appendChild(wrapperElm);
    console.log(wrapperElm);
  }

}

const hobby = new HobbyGenerator(document.getElementById('hobbies'), '../json/hobby.json', 'hobbies');
hobby.init();

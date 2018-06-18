const _ = require('lodash');
const Tube = require('./Tube');

class Course {

  constructor({
    id,
    // attributes
    description,
    imageUrl,
    isAdaptive,
    name,
    type,
    // relations
    assessment,
    challenges = [],
    competences = [],
    competenceSkills = [],
    tubes = [],
  } = {}) {
    // properties
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.isAdaptive = isAdaptive;
    this.type = type;

    // relationships
    this.assessment = assessment;
    this.challenges = challenges; // Array of Record IDs
    this.competences = competences; // Array of Record IDs
    this.competenceSkills = competenceSkills;
    this.tubes = tubes;
  }

  get nbChallenges() {
    return this.challenges.length;
  }

  addCompetenceSkills(competenceSkills) {
    this.competenceSkills = competenceSkills;
  }

  findTube(tubeName) {
    return this.tubes.find(tube => tube.name === tubeName);
  }

  computeTubes(listSkills) {
    const tubes = [];

    listSkills.forEach(skill => {
      const tubeNameOfSkill = skill.tubeName;

      if(!tubes.find((tube) => tube.name === tubeNameOfSkill)) {
        tubes.push(new Tube({ skills: [skill] }));
      } else {
        const tube = this.findTube(tubeNameOfSkill);
        tube.addSkill(skill);
      }
      this.tubes = tubes;

    });

    tubes.forEach(tube =>  {
      tube.skills = _.sortBy(tube.skills, ['difficulty']);
    });
    this.tubes = tubes;
    return tubes;
  }
}

module.exports = Course;

Profile = new Mongo.Collection('profile');

ProfilesIndex = new EasySearch.Index({
  collection: Profile,
  fields: ['name', 'surname', 'patronimyc', 'studentId'],
  engine: new EasySearch.Minimongo({
    sort: () => { 
      return {surname: 1, name: 1, patronimyc: 1}
    }, // sort by score
    selector: function (searchObject, options, aggregation) {
      // selector contains the default mongo selector that Easy Search would use
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      // modify the selector to only match documents where region equals "New York"
      selector.groupUser = 'student';

      return selector;
    }

  })
});


StudentsIndex = new EasySearch.Index({
  collection: Profile,
  fields: ['name', 'surname', 'patronimyc', 'studentId'],
  engine: new EasySearch.Minimongo({
    sort: () => { 
      return {admitted: 1, createdAt: -1, surname: 1, name: 1, patronimyc: 1}
    }, // sort by score
    selector: function (searchObject, options, aggregation) {
      // selector contains the default mongo selector that Easy Search would use
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      // modify the selector to only match documents where region equals "New York"
      selector.groupUser = 'student';

      return selector;
    }

  })
});

TeachersIndex = new EasySearch.Index({
  collection: Profile,
  fields: ['name', 'surname', 'patronimyc', 'userId', 'teacherId'],
  engine: new EasySearch.Minimongo({
    sort: () => { 
      return {createdAt: -1, surname: 1, name: 1, patronimyc: 1}
    }, // sort by score
    selector: function (searchObject, options, aggregation) {
      // selector contains the default mongo selector that Easy Search would use
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      // modify the selector to only match documents where region equals "New York"
      selector.groupUser = 'teacher';

      return selector;
    }

  })
});
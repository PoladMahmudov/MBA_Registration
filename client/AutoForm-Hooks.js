AutoForm.addHooks(null, {
  before: {
    update: function(doc) {
      _.each(doc.$set, function(value, setter) {
        if (_.isArray(value)) {
          var newValue = _.compact(value);
          doc.$set[setter] = newValue;
        }
      });
      return doc;
    }
  }
});

var hooksObject = {
   before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    method: function(doc) {
      // Potentially alter the doc
      doc.admitted = false;

      // Then return it or pass it to this.result()
      return doc; //(synchronous)
      //return false; (synchronous, cancel)
      //this.result(doc); (asynchronous)
      //this.result(false); (asynchronous, cancel)
    }
  }
}


AutoForm.hooks({
  insertAdditionalUserInfo: hooksObject
});

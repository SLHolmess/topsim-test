class ClassName {
    base: any;
    constructor(className: any) {
      this.base = className;
  
      if (!Array.isArray(className)) {
        this.base = [this.base];
      }
    }
  
    add(className: any) {
      if (!Array.isArray(className)) {
        className = [className];
      }
  
      this.base = [...this.base, ...className];
  
      return this;
    }
  
    addIf(className: any, condition: any) {
      if (condition) this.add(className);
      return this;
    }
  
    toString() {
      return this.base.join(' ');
    }
  }
  
  export default ClassName;
  
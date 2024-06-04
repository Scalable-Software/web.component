import {
  defineComponent,
  appendTemplate,
  removeTemplate,
  appendComponent,
} from "./Helper.js";

import { Attribute, Visible, State } from "../../src/Pin.meta.js";

import { Pin } from "pin";

const template = `
<link rel="stylesheet" href="../dist/Pin.style.css">
<div class="icon">
  <svg class="on" height="24px" width="24px" viewBox="0 0 20 20" fill="#212121">
    <path
      d="M2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.896 7.60309L4.01834 8.75415C3.35177 9.02078 3.17498 9.88209 3.68262 10.3897L6.29289 13L3 16.2929V17H3.70711L7 13.7071L9.61027 16.3174C10.1179 16.825 10.9792 16.6482 11.2459 15.9817L12.3969 13.104L17.1464 17.8536C17.3417 18.0488 17.6583 18.0488 17.8536 17.8536C18.0488 17.6583 18.0488 17.3417 17.8536 17.1464L2.85355 2.14645ZM11.6276 12.3347L10.3174 15.6103L4.38973 9.68263L7.66531 8.3724L11.6276 12.3347ZM12.9565 10.7127C12.9294 10.7263 12.9026 10.7403 12.8761 10.7548L13.6202 11.4989L16.8622 9.87793C18.0832 9.26743 18.3473 7.64015 17.382 6.67486L13.3251 2.61804C12.3599 1.65275 10.7326 1.91683 10.1221 3.13783L8.5011 6.37977L9.24523 7.1239C9.25971 7.09739 9.27373 7.07059 9.28728 7.04349L11.0165 3.58504C11.3218 2.97454 12.1354 2.8425 12.618 3.32514L16.6749 7.38197C17.1575 7.86461 17.0255 8.67826 16.415 8.98351L12.9565 10.7127Z" />
  </svg>
  <svg class="off" height="24px" width="24px" viewBox="0 0 20 20" fill="#212121">
    <path
      d="M10.1221 3.13782C10.7326 1.91683 12.3599 1.65275 13.3251 2.61804L17.382 6.67486C18.3472 7.64015 18.0832 9.26743 16.8622 9.87793L13.4037 11.6072C13.0751 11.7715 12.8183 12.0506 12.6818 12.3917L11.2459 15.9817C10.9792 16.6482 10.1179 16.825 9.61027 16.3174L7 13.7071L3.70711 17H3V16.2929L6.29289 13L3.68262 10.3897C3.17498 9.88209 3.35177 9.02078 4.01834 8.75415L7.60829 7.31817C7.94939 7.18173 8.22855 6.92486 8.39285 6.59628L10.1221 3.13782ZM12.618 3.32514C12.1354 2.8425 11.3217 2.97454 11.0165 3.58504L9.28727 7.04349C9.01345 7.59113 8.54818 8.01925 7.97968 8.24665L4.38973 9.68263L10.3174 15.6103L11.7534 12.0203C11.9808 11.4518 12.4089 10.9866 12.9565 10.7127L16.415 8.9835C17.0255 8.67826 17.1575 7.86461 16.6749 7.38197L12.618 3.32514Z" />
  </svg>
</div>`;

describe("Given Pin imported", () => {
  it("then Pin exist", () => {
    expect(Pin).toBeDefined();
  });
  describe("When Pin exist", () => {
    it("then Pin.Tag static getter exist", () => {
      expect(Pin.Tag).toBeDefined();
    });
    it("then Pin.Tag is 'pin-button'", () => {
      expect(Pin.Tag).toBe("pin-button");
    });
    it("then Pin.Attributes static getter exist", () => {
      expect(Pin.Attributes).toBeDefined();
    });
    it("then Pin.Attributes is Attribute", () => {
      expect(Pin.Attributes).toEqual(Attribute);
    });
  });
});

describe("Given Pin is defined in custom element registry", () => {
  beforeEach(() => {
    defineComponent(Pin.Tag, Pin);
  });
  it("then custom element registry should contain Pin", () => {
    expect(customElements.get(Pin.Tag)).toBe(Pin);
  });
  describe("and HTML Template added to DOM", () => {
    beforeEach(() => {
      appendTemplate(Pin.Tag, template);
    });
    afterEach(() => {
      removeTemplate(Pin.Tag);
    });
    it("then a HTML Template exist in DOM", () => {
      expect(document.getElementsByTagName("template")).toHaveSize(1);
    });
    describe("when Pin added to DOM", () => {
      let pin: Pin;
      beforeEach(() => {
        pin = appendComponent<Pin>(Pin.Tag);
      });
      afterEach(() => {
        pin.remove();
      });
      it("Then pin.visible is Visible.YES", () => {
        expect(pin.visible).toEqual(Visible.YES);
      });
      it("Then pin.state is State.OFF", () => {
        expect(pin.state).toEqual(State.OFF);
      });
      describe("and pin.hide()", () => {
        let onhide: jasmine.Spy;
        beforeEach(() => {
          onhide = jasmine.createSpy("onhide");
          pin.onhide = onhide;
          pin.hide();
        });
        it("then pin.visible is Visible.NO", () => {
          expect(pin.visible).toEqual(Visible.NO);
        });
        it("then html attribute visible is Visible.NO", () => {
          expect(pin.getAttribute(Attribute.VISIBLE)).toEqual(Visible.NO);
        });
        it("then onhide is called", () => {
          expect(onhide).toHaveBeenCalled();
        });
        describe("and pin.show()", () => {
          let onshow: jasmine.Spy;
          beforeEach(() => {
            onshow = jasmine.createSpy("onshow");
            pin.onshow = onshow;
            pin.show();
          });
          it("then pin.visible is Visible.YES", () => {
            console.log(pin["_visible"]);
            expect(pin.visible).toEqual(Visible.YES);
          });
          it("then onshow is called", () => {
            expect(onshow).toHaveBeenCalled();
          });
        });
      });
      describe("and pin.on()", () => {
        let onon: jasmine.Spy;
        beforeEach(() => {
          onon = jasmine.createSpy("onon");
          pin.onon = onon;
          pin.on();
        });
        it("then pin.state is State.ON", () => {
          expect(pin.state).toEqual(State.ON);
        });
        it("then html attribute state is State.ON", () => {
          expect(pin.getAttribute(Attribute.STATE)).toEqual(State.ON);
        });
        it("then onon is called", () => {
          expect(onon).toHaveBeenCalled();
        });
        describe("and pin.off()", () => {
          let onoff: jasmine.Spy;
          beforeEach(() => {
            onoff = jasmine.createSpy("onoff");
            pin.onoff = onoff;
            pin.off();
          });
          it("then pin.state is State.OFF", () => {
            expect(pin.state).toEqual(State.OFF);
          });
          it("then html attribute state is State.OFF", () => {
            expect(pin.getAttribute(Attribute.STATE)).toEqual(State.OFF);
          });
          it("then onoff is called", () => {
            expect(onoff).toHaveBeenCalled();
          });
        });
      });
      describe("and pin.toggle()", () => {
        let onon: jasmine.Spy;
        beforeEach(() => {
          onon = jasmine.createSpy("onon");
          pin.onon = onon;
          pin.toggle();
        });
        it("then pin.state is State.ON", () => {
          expect(pin.state).toEqual(State.ON);
        });
        it("then html attribute state is State.ON", () => {
          expect(pin.getAttribute(Attribute.STATE)).toEqual(State.ON);
        });
        it("then onon is called", () => {
          expect(onon).toHaveBeenCalled();
        });
        describe("and pin.toggle()", () => {
          let onoff: jasmine.Spy;
          beforeEach(() => {
            onoff = jasmine.createSpy("onoff");
            pin.onoff = onoff;
            pin.toggle();
          });
          it("then pin.state is State.OFF", () => {
            expect(pin.state).toEqual(State.OFF);
          });
          it("then html attribute state is State.OFF", () => {
            expect(pin.getAttribute(Attribute.STATE)).toEqual(State.OFF);
          });
          it("then onoff is called", () => {
            expect(onoff).toHaveBeenCalled();
          });
        });
      });
      describe("and user clicks on pin", () => {
        let onon: jasmine.Spy;
        beforeEach(() => {
          onon = jasmine.createSpy("onon");
          pin.onon = onon;
          pin.click();
        });
        it("then pin.state is State.ON", () => {
          expect(pin.state).toEqual(State.ON);
        });
        it("then html attribute state is State.ON", () => {
          expect(pin.getAttribute(Attribute.STATE)).toEqual(State.ON);
        });
        it("then onon is called", () => {
          expect(onon).toHaveBeenCalled();
        });
      });
    });
  });
});

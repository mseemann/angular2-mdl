import { inject, TestBed } from "@angular/core/testing";

import { MdlTooltipPositionService } from "./mdl-tooltip-position.service";

describe("Component: MdlTooltipPositionService", () => {
  let service: MdlTooltipPositionService;
  let boundingClientRect: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdlTooltipPositionService],
    });
  });

  beforeEach(inject(
    [MdlTooltipPositionService],
    (mdlService: MdlTooltipPositionService) => {
      service = mdlService;
      boundingClientRect = {
        bottom: 100,
        height: 20,
        left: 200,
        right: 200,
        top: 100,
        width: 20,
      };
    }
  ));

  // left Object{top: '110px', marginTop: '0px', left: '190px'}
  // top Object{left: '210px', marginLeft: '0px', top: '90px'}
  // right Object{top: '110px', marginTop: '0px', left: '230px'}
  // bottom Object{left: '210px', marginLeft: '0px', top: '130px'}

  it("should calculate the position for tooltips with position left", () => {
    const style = service.calcStyle(0, 0, boundingClientRect, "left");
    expect(style["top"]).toBe("110px");
    expect(style["left"]).toBe("190px");
  });

  it("should calculate the position for tooltips with position top", () => {
    const style = service.calcStyle(0, 0, boundingClientRect, "top");
    expect(style["top"]).toBe("90px");
    expect(style["left"]).toBe("210px");
  });

  it("should calculate the position for tooltips with position right", () => {
    const style = service.calcStyle(0, 0, boundingClientRect, "right");
    expect(style["top"]).toBe("110px");
    expect(style["left"]).toBe("230px");
  });

  it("should calculate the position for tooltips with position bottom", () => {
    const style = service.calcStyle(0, 0, boundingClientRect, "bottom");
    expect(style["top"]).toBe("130px");
    expect(style["left"]).toBe("210px");
  });

  it("should calculate the position for tooltips with position left with neg top", () => {
    boundingClientRect.top = -100;
    const style = service.calcStyle(0, 0, boundingClientRect, "left");
    // Object{top: '0', marginTop: '0', left: '190px'}
    expect(style["top"]).toBe("0");
    expect(style["left"]).toBe("190px");
  });

  it("should calculate the position for tooltips with position top with neg left", () => {
    boundingClientRect.left = -100;
    const style = service.calcStyle(0, 0, boundingClientRect, "top");
    // Object{left: '0', marginLeft: '0', top: '90px'}
    expect(style["top"]).toBe("90px");
    expect(style["left"]).toBe("0");
  });
});

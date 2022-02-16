import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[bassFixedHeaderDirective]',
})
/*
  - in constactor, to detect change with RouteReuseStrategy
  - then add in subscribe pageUpdated
  
  private router: Router
  router.events.subscribe((evt) => {
    if (!(evt instanceof NavigationEnd)) {
        return;
    }
    this.pageUpdated = !this.pageUpdated;
  });
  */
export class BassFixedHeaderDirective implements OnInit, OnDestroy, OnChanges {
  @Input() tableId: string;
  @Input() tableTHeadId: string;
  @Input() tableTBodyId: string;
  @Input() tableTHeadTrId: string;
  @Input() pageUpdated: boolean; // fire to resize scroll ues (pageUpdated = !pageUpdated)
  @Input() pageDestored: boolean; // fire to remove header when tab change => ("with cache")

  z2table: HTMLElement;
  z2tableTHeadTr: HTMLElement;
  z2tableTHead: HTMLElement;
  z2tableTBody: HTMLElement;

  theadPaddingTopBottom = '0.45rem';
  theadPaddingLeftRight = '1rem';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => {
      this.inIt();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.z2table) {
      setTimeout(() => {
        this.changes(changes);
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.removeTheadToFixedItems();
    // for fixed table header
    window.removeEventListener('scroll', this.onBodyscroll, true);
  }

  inIt() {
    // this.removeTheadToFixedItems();

    this.z2tableinit();

    // get event on body/window scroll
    window.addEventListener('scroll', this.onBodyscroll, true);

    // called 2 times because the wired behavie of table wjen style attr added to Element
    this.checkPaddingAndTHSize();
    this.checkPaddingAndTHSize();
    this.scroll();
  }

  changes(changes: any) {
    if (changes.pageDestored) {
      // window.removeEventListener('scroll', this.onBodyscroll, true);
      this.removeTheadToFixedItems();
      this.scroll();
    } else {
      this.checkPaddingAndTHSize();
      this.scroll();
    }
  }

  checkPaddingAndTHSize() {
    const scrollFound = this.containerHasHorizontalScrollbar();
    if (!scrollFound) {
      // no scroll,,, small caoumns
      setTimeout(() => {
        this.changeThSizes();
      }, 500);
      this.z2table.style.tableLayout = 'fixed';
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (
        let index = 0;
        index < this.z2tableTHeadTr.children.length;
        index++
      ) {
        const oldTh = this.z2tableTHeadTr.children[index] as HTMLElement;
        oldTh.removeAttribute('style');
      }
    }
  }

  containerHasHorizontalScrollbar(): boolean {
    const hasHorizontalScrollbar =
      this.el.nativeElement.scrollWidth > this.el.nativeElement.clientWidth;
    if (hasHorizontalScrollbar === false) {
      return false;
    } else {
      return true;
    }
  }

  z2tableinit() {
    this.z2table = document.querySelector('#' + this.tableId) as HTMLElement;
    this.z2tableTHead = document.querySelector(
      '#' + this.tableTHeadId
    ) as HTMLElement;
    this.z2tableTHeadTr = document.querySelector(
      '#' + this.tableTHeadTrId
    ) as HTMLElement;
    this.z2tableTBody = document.querySelector(
      '#' + this.tableTBodyId
    ) as HTMLElement;

    if (!this.z2table) {
      console.log('No! table id not found..........');
    } else {
      this.z2table.style.tableLayout = 'fixed';
      this.z2table.style.width = 'max-content';
    }

    if (!this.z2tableTHead) {
      console.log('No! table thead id not found..........');
    }
    if (!this.z2tableTHeadTr) {
      console.log('No! table thead tr not found..........');
    }
  }

  onBodyscroll = (): void => {
    this.scroll();
  };

  scroll() {
    // tthis check because of tabs cache
    const table = document.querySelector('#' + this.tableId);
    if (this.z2table && table) {
      // this.containerHasHorizontalScrollbar();
      // for fixed table header

      const topPos = this.z2table.offsetTop;
      const pos = window.pageYOffset;
      const tHeadHeight = this.z2tableTHead.clientHeight;

      if (this.z2tableTHead) {
        if (pos + this.z2tableTHead.clientHeight > topPos) {
          const left = this.z2table.offsetLeft;
          this.z2tableTHead.style.marginLeft = left + 'px';
          this.z2tableTHead.classList.add('BassTblScroll');
          this.addTheadToFixedItems();
        } else {
          this.z2tableTHead.classList.remove('BassTblScroll');
          this.removeTheadToFixedItems();
        }
      }
    }
  }

  changeThSizes() {
    if (
      this.z2tableTBody &&
      this.z2tableTBody.children &&
      this.z2tableTBody.children.length >= 1
    ) {
      for (
        let index = 0;
        index < this.z2tableTHeadTr.children.length;
        index++
      ) {
        const oldTd = this.z2tableTBody.children[0].children[
          index
        ] as HTMLElement;
        const oldTh = this.z2tableTHeadTr.children[index] as HTMLElement;
        if (!oldTh.hasAttribute('hidden')) {
          let orPadding = 0; // beacause border-right
          const elStyles = window.getComputedStyle(oldTh);
          orPadding =
            orPadding +
            Number(elStyles.paddingLeft.replace('px', '')) +
            Number(elStyles.paddingRight.replace('px', '')) +
            // + Number(elStyles.borderRightWidth.replace('px', ''))
            // + Number(elStyles.borderLeftWidth.replace('px', ''))
            Number(elStyles.marginLeft.replace('px', '')) +
            Number(elStyles.marginRight.replace('px', ''));

          const newWeidth = oldTd.clientWidth - orPadding;
          if (newWeidth !== 0) {
            const styles = 'min-width: ' + newWeidth + 'px !important;';
            oldTh.setAttribute('style', styles);
          }
        }
      }
    }
  }

  addTheadToFixedItems() {
    const fixedItems = document.getElementById('fixedItems');
    const fixedItemsStyle =
      'height:' + this.z2tableTHead.clientHeight + 'px;display: block;';
    if (fixedItems) {
      fixedItems.setAttribute('style', fixedItemsStyle);

      const itemsEl = fixedItems.querySelector('#' + this.tableId);
      if (!itemsEl) {
        const containerDiv = this.renderer.createElement('div') as HTMLElement;
        containerDiv.id = this.tableId;
        containerDiv.classList.add('table-container');
        const containerDivStyle =
          'width: ' + this.el.nativeElement.clientWidth + 'px';
        containerDiv.setAttribute('style', containerDivStyle);

        const tableDiv = this.renderer.createElement('div') as HTMLElement;
        tableDiv.classList.add('z2table-fly-table');
        tableDiv.classList.add('bigtitle');

        const tableDivStyle = 'width: inherit';
        tableDiv.setAttribute('style', tableDivStyle);

        this.renderer.appendChild(tableDiv, this.z2tableTHead);
        this.renderer.appendChild(containerDiv, tableDiv);
        this.renderer.appendChild(fixedItems, containerDiv);

        this.z2tableTHead.scrollLeft = this.el.nativeElement.scrollLeft;
      } else {
        const containerDiv = itemsEl;
        (containerDiv as HTMLElement).style.display = 'block';
        this.renderer.appendChild(containerDiv.lastChild, this.z2tableTHead);

        this.z2tableTHead.scrollLeft = this.el.nativeElement.scrollLeft;
      }
    } else {
      console.log(
        'NoS! no div with "fixedItems" class found... it must be in index.html'
      );
    }
  }

  removeTheadToFixedItems() {
    const fixedItems = document.getElementById('fixedItems');
    if (fixedItems) {
      if (fixedItems.firstChild) {
        this.renderer.appendChild(this.z2table, this.z2tableTHead);

        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < fixedItems.children.length; index++) {
          const element = fixedItems.children[index];

          element.remove();
        }

        fixedItems.setAttribute(
          'style',
          'display: none;overflow:hidden !important'
        );
      }
    } else {
      console.log(
        'No! no div with "fixedItems" class found... it must be in index.html'
      );
    }
  }
}

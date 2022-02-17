# Angular Fixed Header table

angular-Fixed-Header-table is A simple solution for fixed header in any table.

Live demo can be found here =>

[Live Demo "StackBlitz ⚡️"](https://stackblitz.com/edit/angular-ivy-tsljzh)


<a href="https://www.npmjs.com/package/angular-fixed-header-table"><img src="https://img.shields.io/badge/npm-v1.1-blue" alt="npm latest version" ></a>


## Installation

Install the npm package.
```
  npm i angular-fixed-header-table
```
Import module:
```ts
  import { NgFixedHeaderModule } from 'angular-fixed-header-table';

  @NgModule({
      imports: [
      NgFixedHeaderModule
      .....
      ]
  })
```


## Usage

- add div with id "fixed Items", prefer it before app-root.

```html
<body>
  <div id="fixedItems"></div>
  <app-root></app-root>
</body>
...
```



- add the directive selector (bassFixedHeaderDirective) on div that have the table, and give it id of your table, thead, thead tr and  tbody
  ex:
```html
<div class="overflow-auto p-2 " bassFixedHeaderDirective [tableId]="'cutomTableId'"
    [tableTHeadId]="'cutomTableTHeadId'" [tableTHeadTrId]="'cutomTableTHeadTrId'"
    [tableTBodyId]="'cutomTableTBodyId'" [pageUpdated]="pageUpdated" [pageDestored]="pageDestored">
    <table id="cutomTableId" class="table table-striped table-bordered table-hover">
      <thead id="cutomTableTHeadId">
        <tr id="cutomTableTHeadTrId">
          <th scope="col" class="heightAndwidth thStyles">Email</th>
          <th scope="col" class="heightAndwidth thStyles">Name</th>
        </tr>
      </thead>
      <tbody id="cutomTableTBodyId">
        <tr *ngFor="let item of dataList">
          <td class="heightAndwidth">{{item.email}}</td>
          <td class="heightAndwidth">{{item.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
```



- pageUpdated input you can toggle it when u want to re-int the directive.
    like the table columns changed.

```ts
this.pageUpdated = !this.pageUpdated;
```

## CSS configurations
- You must include this styles.
- !important you must style your "th in thead" => in that class "thStyles"
- !important you must style your "height And width" for th and td => in that class "heightAndwidth"

```css
  #fixedItems {
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    max-height: 100vh;
    overflow: hidden;
  }
  .BassTblScroll {
    position: fixed;
    top: 0;
    left: auto;
    width: inherit;
    z-index: 30;
    overflow: hidden;
    text-align: left!important;
  }
  .heightAndwidth{
      width: 250px !important;
      max-width: 250px !important;
      min-width: 250px !important;
      height: 50px !important;
  }
  .thStyles {
    background-color: #ffeeba;
    font-weight: bold;
    border: 1px solid #dee2e6;
    padding: 0.75rem;
  }
```

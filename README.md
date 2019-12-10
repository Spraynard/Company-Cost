# ![Company Cost Logo](docs/public/logos/company_cost_logo_100x100.png) Company Cost :money_with_wings: :page_with_curl:
An app that allows users to track the operating cost of business operations. Also can provide an even more insightful look into your personal life by giving a basic view of your budget.

## App Documentation / How-To
This section will explain the philosophy of what the app provides, and how to use the app.

### Philosophy
This app was made in order to provide users with a detailed look of their operating costs, whether in a business or a personal sense. The user is given the ability to be as detailed as they want to be with categorization of their expenses. Listed below are the tools given to users to have this amount of customization.

* `Expense Groups`
Thought of as a category of expenses. Each of these groups contain `Expenses` that build towards the working total of that category (as well as the working total of the whole worksheet)

* `Expenses` - also known as `Expense Group Children`
Pretty self explanatory. Each of these is one expense filled with monetary information related to how much money is required for that "operation" in your operating cost.

### App Usage

#### `Expense Groups`
___
##### Adding an `Expense Group`

Add an expense group by clicking on the *Add Expense Group* button in the top application menu.

##### Removing an `Expense Group`

You can remove an expense group by clicking on the *trash can* icon on the top right of an expense group. Be careful, as you will lose any work on the expense group.

##### Editing an `Expense Group`

Edit the *title* and *description* of an expense group by clicking on the *Edit Group* button of
whichever expense group you would like to change.

This functionality specifically allows you to update expense groups to be part of the domain that you'd like to keep track of. Names for groups such as `Bills`, `Groceries`, `Freelancers`, etc... are great, descriptive names that will allow you to keep track of what the expenses in each group are actually for.

#### `Expenses`
___
##### Adding an `Expense`

You can add an expense to a specific expense group by clicking or tapping on the *Add Expense* button of your group.

##### Removing an `Expense`

To remove an expense from an expense group, click or tap on the X under the `Remove` header of your expense-group expense table.

##### Editing an `Expense`

You can edit the fields of an expense by clicking anywhere on an expense (except for the X). The editable expense should be larger than every other expense. Once selected, click or tap on the field that you would like to edit and edit it.

After you are done editing, either click/tap anywhere not on the currently editing expense or hit the `Return` key on your keyboard. The changes that you made should be saved, and be a part of the application.

#### Reading Your Expense Report
Coming Soon.

### FAQ

* Q: The application wont load / is just a white screen
    - Try clearing your `localStorage`. In the developer console (F12 or ctrl+shift+c or cmd+shift+c) enter `localStorage.clear()` and reload the page.

### Future Updates

* :sunglasses: Updating to a more mobile friendly interface.
* :bar_chart: Graphing (Line and Pie) to see the relation of each expense group's total to the overall total.
* :dancers: Multiple Worksheets
* :floppy_disk: Save your worksheet

### Built With
* [Webpack](https://webpack.js.org/) - Open source JavaScript module bundler
* [React](https://reactjs.org/) - A JavaScript library for building front end interfaces
* [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
* [Material UI](https://material-ui.com/) - React components that interface with Material Design

### License

MIT

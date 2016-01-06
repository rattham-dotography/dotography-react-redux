# SCALE

Project by Dotography
(http://www.dotography.com)

###Setup front-end scripts/stylesheets

####Installation Prerequisites

######Step 1 - Install NPM (Node Packaged Modules)
> https://nodejs.org/en/download/

######Step 2 - Install Bower

```
> npm install -g bower
```

######Step 3 - Download dependencies

```
> npm install
> bower install
```

####Compilation Command

######just compile css

```
> npm run build:css
```

######just compile js

```
> npm run build:js
```

######watch the change
```
> npm run build:watch
```

######remove all compiled files

```
> npm run build:clean
```

######remove all compiled files & compile

```
> npm run build

```

######remove all compiled files & compile & watch

```
> npm run build:watch
```

###### run test

```
> npm run test
```

###### run test and watch file

```
> npm run test:watch
```

###### run local app server

```
> npm run build && npm start
```

####Source files path

######Stylesheet

> app/dev/stylesheets/

######Bootstrap

> app/dev/global/

> app/dev/bootstrap.scss

######Javascript

> app/dev/javascripts/

####Dist files path

###### Only Front End App directory

> app/dist/

###### Lift webapp directory

> src/main/webapp/

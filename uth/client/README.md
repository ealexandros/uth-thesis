# StoryBook - Uth Client

### 🔨 Setup

#### Makefile

List every command of `Makefile` with:

```bash
$ make help
```

#### Fast Setup

Fastest way to run the current repo is with:

```bash
$ make run dev
```

This command will create a docker container with all the prerequisites necessary. After that open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To access the container execute the following command:

```bash
$ make run dev-tty
```

#### Production

For productions use case execute:

```bash
$ make run prod
```

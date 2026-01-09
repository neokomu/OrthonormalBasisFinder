Documentation
Group 8
Orthonormal Basis Finder

Right now:
- orthobasis is a package within OrthonormalBasisFinder
- meaning it can be imported anywhere within the root folder (i think) without concern sa file hierarchy (pero you need to do some stuff first, discussed after this)
- the entire package lives in "src" and supplementary file ung "pyproject.toml" (negligible yan skip ads)

- like every package this one needs to be installed din to ur device (make it known as a package)
- pip install does this in the bg pero di naman integrated saten ng pip install 

Stuff to do:
I think u need to gpt prompt this pero u need to somehow run this command
-
```
pip install -e .
```

or

```
py -m pip install -e .
```

Basically it will look for the "src" fodler and "pyproject.toml" which as we know under "OrthonormalBasisFinder"
So you MUST run it under an integrated terminal in our root folder "OrthonormalBasisFinder"
-
This can get complicated with people na use pythons built-in env venv pero you can use chatgpt to guide you, you can even send this entire text to chatgpt and probably may masasabi sya to help you
For people na di nag eenvironment baka u run it directly as prescribed


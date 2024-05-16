# from compilers.compiler_module import compile_cpp, compile_java, compile_python

class Compiler:
    def compile_code(self, language, code):
        if language == "cpp":
            output = "cpp"
        elif language == "java":
            output = "java"
        elif language == "python":
            output = "python"
	elif language = "js":
		output = "js"
        else:
            return {"status": "error", "message": "Unsupported language"}
        return {"status": "success", "output": output}

import random

def extract_random_lines(event):
    input_text = Element("inputText").value
    lines = input_text.splitlines()  # 改行で分割
    unique_lines = list(set(line for line in lines if line.strip()))  
    
    try:
        line_count = int(Element("lineCount").value)
    except ValueError:
        line_count = 20
    
    line_count = min(line_count, len(unique_lines))
    
    output_lines = random.sample(unique_lines, line_count) 
    Element("outputText").element.value = "\n".join(output_lines)

Element("extractButton").element.onclick = extract_random_lines

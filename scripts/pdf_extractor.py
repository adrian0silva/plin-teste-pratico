#!/usr/bin/env python3
import sys
import json
from pathlib import Path

def extract(pdf_path):
    title = "Sem título"
    content = ""

    try:
        # extração de metadados via pypdf
        from pypdf import PdfReader
        reader = PdfReader(pdf_path)
        info = reader.metadata
        if info and getattr(info, 'title', None):
            t = info.title.strip()
            if t:
                title = t
    except Exception:
        # não crítico — se falhar, tenta extrair texto e primeira linha
        pass

    try:
        import pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            pages_text = []
            for p in pdf.pages:
                pages_text.append(p.extract_text() or "")
            content = "\n".join(pages_text).strip()

        # se não tem título nos metadados, pegar a primeira linha do texto
        if title == "Sem título" and content:
            first_line = content.splitlines()[0].strip()
            if first_line and len(first_line) < 200:
                title = first_line
    except Exception as e:
        # fallback simples: tentar extrair texto com pypdf
        try:
            from pypdf import PdfReader
            reader = PdfReader(pdf_path)
            texts = []
            for p in reader.pages:
                t = p.extract_text() or ""
                texts.append(t)
            content = "\n".join(texts).strip()
            if title == "Sem título" and content:
                first_line = content.splitlines()[0].strip()
                if first_line and len(first_line) < 200:
                    title = first_line
        except Exception as e2:
            # se tudo falhar, reportar erro
            raise RuntimeError(f"Falha ao extrair PDF: {e} / {e2}")

    return {"title": title, "content": content}

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "caminho do PDF não informado"}))
        sys.exit(1)

    pdf_path = sys.argv[1]
    p = Path(pdf_path)
    if not p.exists():
        print(json.dumps({"error": "arquivo não encontrado"}))
        sys.exit(1)

    try:
        result = extract(pdf_path)
        # imprimir JSON no stdout para o Node ler
        print(json.dumps(result, ensure_ascii=False))
    except Exception as e:
        # escreva a mensagem de erro no stderr para facilitar debug
        sys.stderr.write(str(e))
        sys.exit(2)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Script para fazer web scraping de páginas web
Extrai título e conteúdo de uma URL fornecida
"""

import sys
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def scrape_url(url):
    """
    Faz scraping de uma URL e retorna título e conteúdo
    """
    try:
        # Headers para evitar bloqueios
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Faz requisição HTTP
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse do HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extrai título
        title = None
        if soup.title:
            title = soup.title.string.strip()
        elif soup.find('h1'):
            title = soup.find('h1').get_text().strip()
        elif soup.find('meta', property='og:title'):
            title = soup.find('meta', property='og:title').get('content', '').strip()
        
        # Remove scripts e styles
        for script in soup(["script", "style", "nav", "footer", "header", "aside"]):
            script.decompose()
        
        # Extrai conteúdo do texto
        text = soup.get_text()
        
        # Limpa o texto (remove espaços extras e quebras de linha)
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        content = ' '.join(chunk for chunk in chunks if chunk)
        
        # Limita o conteúdo a 10000 caracteres
        if len(content) > 10000:
            content = content[:10000] + '...'
        
        return {
            'title': title or 'Sem título',
            'content': content or 'Conteúdo não disponível'
        }
        
    except requests.exceptions.RequestException as e:
        return {
            'title': 'Erro ao acessar URL',
            'content': f'Erro: {str(e)}'
        }
    except Exception as e:
        return {
            'title': 'Erro ao processar página',
            'content': f'Erro: {str(e)}'
        }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        result = {
            'title': 'Erro',
            'content': 'URL não fornecida'
        }
    else:
        url = sys.argv[1]
        result = scrape_url(url)
    
    # Retorna resultado em JSON
    print(json.dumps(result, ensure_ascii=False))



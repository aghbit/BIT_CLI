# Rzeczy zrobione i do zrobienia


## Zrobione:
- komenda "runtest" z możliwością przetestowania pojedyńczego zadania, całego zestawu jak i całego workspace'u
- config.json - plik konfiguracyjny
- kopiowanie pliku użytkownika do prog.py
- sprawdzanie daty edycji pliku użytkownika i porównywanie z datą ostatnio odpalonego testu
- obsługa stdout pytest'a
- zapis wyników testowania do klasy Task
- zapis daty wykonania testu
- zapis wyników do pliku .csv z opcjami headera jako pierwszej linijki i możliwością zapisu zgodnie z kolejnością zadań
- wyświetlenie wyników w terminalu

Na tym etapie komenda docelowa działa i w pełni realizuje swoje zadanie odpalenia testów, zebrania wyników, zapisu do csv i wyświetlenia w terminalu


## Do zrobienia:
- runTests.ts - naprawa funkcji kopiującej plik użytkownika, tak aby nie wywalała się gdy plik nie istnieje
- parser.ts - wyłapywanie i obsługa błędów zwracanych przez pytest, poprawienia tymczasowego if(true) na coś innego
- dodatkowe flagi komendy runtest (nazwy są jedynie moją propozycją, mogą być inne)
  - --display - wyświetla wyniki testów w terminalu (domyślnie nie wyświetla)
  - --skipNotExisting - podczas testowania pomija nieistniejące pliki użytkownika (domyślnie testuje wszystko co zostało przekazane w argumencie komendy, dla nieistniejącego pliku output taki sam jak dla istniejącego pliku z pustą funkcją)
  - --ignoreEditTime - forsuje testowanie niezależnie od tego czy test już został wykonany po edycji pliku użytkownika czy nie
- nowa komenda do ustawiania wartości w config.json
- ?proste okienko do wyświetlania wyników testów?


# Poniżej informacje dla użytkownika końcowego
# Struktura projektu


## Komenda "runtest"
- bez flag testuje cały workspace
- flaga '-s' określa zestaw do przetestowania
  - np. "runtest -s 1"  przetestuje cały zestaw 1
- flaga '-t' określa zadanie do przetestowania
  - np. "runtest -s 1 -t 1"  przetestuje zadanie 1 zestawu 1


## Plik "config.json" - konfiguracja funkcjonalności
  - "path" - ścieżka bezwględna do projektu
    - np. "path": "C:/Users/Marek/Desktop/Zadania"
  - "csvFileLocation" - ścieżka bezwględna do pliku .csv zapisującego wszystkie postępy
    - np. "csvFileLocation": "C:/Users/Marek/Desktop/Zadania/output.csv"
  - "csvFirstLineHeader" - zawiera informację czy plik .csv ma zawierać header w pierwszej linijce (opcja kosmetyczna)
    - np. "csvFileLocation": false
  - "csvSaveInOrder" - zawiera informację czy zapis do pliku ma być prowadzony zgodnie z kolejnością zadań
    - np. "csvSaveInOrder": true


## W folderze projektu ( ścieżkę do niego ustawiamy w config.json ) muszą być zawarte foldery
- Workspace - folder gdzie pracuje użytkownik
- WDI - folder gdzie zawarte są rozwiązania zadań


## Struktura folderu "Workspace":
- Zestaw_1
  - t_01.py
  - t_02.py <- plik zawierający rozwiązanie UŻYTKOWNIKA do zadania 2 z zestawu 1
  - ...
  - t_20.py
- Zestaw_2
- ...
- Zestaw_6


## Struktura folderu "WDI" (taka sama jak w SummerProject2022):
- Zestaw_1
  - Zadanie_01
      - __init__.py 
      - DATA.txt
      - prog.py <- plik zawierający pustą funkcję (za ten plik zostaje podstawiany plik z rowiązaniem użytkownika)
      - sol.py <- plik zawierający poprawne rozwiązanie zadania
      - test.py <- conajmniej 1 plik zawierający testy
  - Zadanie_02
  - ...
  - Zadanie_20
- Zestaw_2
- ...
- Zestaw_6

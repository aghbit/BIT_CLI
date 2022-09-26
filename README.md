# Rzeczy zrobione i do zrobienia


## Zrobione:
- komenda "runtest" z możliwością przetestowania pojedyńczego zadania, całego zestawu jak i całego workspace'u
- flagi do komendy "runtest": -d (wyświetlanie w terminalu) i -f (forsowanie testu)
- config.json - plik konfiguracyjny
- komenda "runtest config" do edytownania i wyświetlania zawartości pliku config.json przez użytkownika
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
  - --skipNotExisting - podczas testowania pomija nieistniejące pliki użytkownika (domyślnie testuje wszystko co zostało przekazane w argumencie komendy, dla nieistniejącego pliku output taki sam jak dla istniejącego pliku z pustą funkcją)
- ?proste okienko do wyświetlania wyników testów?


# Poniżej informacje dla użytkownika końcowego
# Struktura projektu


## Komenda "runtest"
- bez flag testuje cały workspace
- flaga '-s' określa zestaw do przetestowania
  - np. "runtest -s 1"  przetestuje cały zestaw 1
- flaga '-t' określa zadanie do przetestowania
  - np. "runtest -s 1 -t 1"  przetestuje zadanie 1 zestawu 1
- flaga '-d' powoduje wyświetlenie wyników testu w terminalu
- flaga '-f' wymusza wykonanie testu niezależnie od tego, czy plik użytkownika był edytowany od czasu ostatniego testu

## Komenda "runtest config":
## UWAGA! Przeczytaj uwagę znajdującą się pod tą sekcją!
- flaga '-p' ustawia ścieżkę bezwględną do projektu
  - np. "runtest config -p C:/Users/Marek/Desktop/Zadania"
- flaga '--csvFileLocation' ustawia ścieżkę bezwględną do pliku .csv gdzie zapisywane będą wyniki testów
  - np. "runtest config --csvFileLocation C:/Users/Marek/Desktop/Zadania/output.csv"
- flaga '--csvFirstLineHeader' określa czy plik .csv ma zawierać header w pierwszej linijce (opcja kosmetyczna)
  - np. "runtest config --csvFirstLineHeader" 
  - np. "runtest config --no-csvFirstLineHeader" (domyślna wartość)
- flaga '--csvSaveInOrder' określa czy zapis do pliku ma być prowadzony zgodnie z kolejnością zadań
  - np. "runtest config --csvSaveInOrder" (domyślna wartość)
  - np. "runtest config --no-csvSaveInOrder"
- flaga '-d' powoduje wyświetlenie zawartości pliku cofig.json w terminalu

## UWAGA! Komendy runtest config można używać tylko przed rozpoczęciem pisania jakichkolwiek rozwiązań, przed zaczęciem projektu. Zmienianie wartości pliku config.json w trakcie pisania rozwiązań, może spowodować wysypanie się programu i niepowrotną stratę postępu i wyników z .csv

## W folderze projektu ( ścieżkę do niego ustawiamy za pomocą komendy "runtest config" ) muszą być zawarte foldery
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

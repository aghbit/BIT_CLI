# Instrukcja dla użytkownika końcowego

## Instalacja krok po kroku
- Otwórz stronę repozytorium BIT_CLI na Githubie i wejdź w zakładkę "Releases"
  - Lub kliknij w link: https://github.com/aghbit/BIT_CLI/releases
- Wybierz wersję dla swojego systemu operacyjnego
  - np. dla Windowsa 64 bitowego wybierz win32-x64
- Kliknij wybraną wersję i pobierz skompresowaną paczkę
- Wypakuj zawartość paczki i zamknij ewentualne okienko z komunikatami diagnostycznymi


## Używanie komend. Jak wywołać komendę?
- Przez terminal przejdź do podfolderu "bin" folderu "bit_cli", który właśnie wypakowałeś
  - np. gdy wypakowałeś folder na Pulpicie przejdź do folderu C:/Users/Marek/Desktop/bit_cli/bin
- każdą komendę poprzedź członem "bit_cli"
  - np. chcąc wywołać komendę "runtest config -d" będąc już w folderze "bin", wpisz "bit_cli runtest config -d" w terminalu
  

## Co muszę jeszcze skonfigurować?
Przed rozpoczęciem pisania rozwiązań do zadań należy skonfigurować plik config.json poprzez komendę "runtest config". W szczególności:
- ścieżkę bezwględną do projektu (folder gdzie znajdują się katalogi Workspace i WDI)
  - np. "runtest config -p C:/Users/Marek/Desktop/Zadania"
- ścieżkę bezwględną do pliku .csv gdzie zapisywane będą wyniki testów (dowolna lokacja)
  - np. "runtest config --csvFileLocation C:/Users/Marek/Desktop/Zadania/output.csv"
#### W razie wątpliwości zajrzyj do opisu komendy "runtest config" w sekcji poniżej. Inne flagi i możliwości konfiguracji opisane są poniżej


##
# Opis komend


## Komenda "runtest config"
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

## UWAGA! Komendy "runtest config" można używać tylko przed rozpoczęciem pisania jakichkolwiek rozwiązań. Zmienianie wartości pliku config.json w trakcie pisania rozwiązań, może spowodować wysypanie się programu i niepowrotną stratę postępu i wyników z .csv


## Komenda "runtest"
- bez flag testuje cały workspace
- flaga '-s' określa zestaw do przetestowania
  - np. "runtest -s 1"  przetestuje cały zestaw 1
- flaga '-t' określa zadanie do przetestowania
  - np. "runtest -s 1 -t 1"  przetestuje zadanie 1 zestawu 1
- flaga '-d' powoduje wyświetlenie wyników testu w terminalu
- flaga '-f' wymusza wykonanie testu niezależnie od tego, czy plik użytkownika był edytowany od czasu ostatniego testu

##
# Struktura projektu

## W folderze projektu ( ścieżkę do niego ustawiamy za pomocą komendy "runtest config" ) muszą być zawarte foldery
- Workspace - folder gdzie pracuje użytkownik
- WDI - folder gdzie zawarte są rozwiązania zadań


## Struktura folderu "Workspace"
- Zestaw_1
  - t_01.py
  - t_02.py <- plik zawierający rozwiązanie UŻYTKOWNIKA do zadania 2 z zestawu 1
  - ...
  - t_20.py
- Zestaw_2
- ...
- Zestaw_6


## Struktura folderu "WDI" (taka sama jak w SummerProject2022)
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

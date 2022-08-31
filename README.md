## Tymczasowe README, po skończeniu projektu napiszę jakieś sensowne

Póki co proponowałbym zrobić funkcje/klasy pomocnicze w katalogu ./src/utils. Wypiszę poniżej te co pamiętam, dodam też później na clickup. Po ich zrobieniu zajmiemy się samą komendą. Napiszę też proponowany input/output, jak ktoś ma lepszy pomysł to piszcie, ale po prostu dobrze żeby wszyscy wiedzieli co przyjmuje i zwraca dana funkcja, bo to bardzo ułatwi pracę.

* Uruchamianie testów (output do uzgodnienia, numery zestawu i zadania wygodniej chyba jako string):
  * jedno zadanie - (nr zestawu, nr zadania) -> objekt z wynikami, albo zapisuje od razu do CSV i nie zwraca nic
  * jeden zestaw - (nr zestawu) -> jak wyżej, obiekt albo nic
  * wszystkie zestawy - (nic) -> jak wyżej
* Zapisywanie do CSV - (tablica obiektów z wynikami) -> nic
* Parę pomysłów na rzeczy które mogą się przydać:
  * Klasa obiektu z wynikami, tworzonego z stdout pytesta; moim zdaniem obiekt powinien mieć nr zestawu, nr zadania, liczbę testów z danym wynikiem dla każdego wyniku (ile git, ile niezdanych, ile skipniętych itp.)
  * Coś, co zczytuje wyniki z CSV i wypisuje je jakoś ładnie w czytelnej dla użytkownika formie

To są oczywiście propozycje, jak ktoś ma pomysł albo chce coś zmienić to piszcie, albo po prostu zmieńcie ten plik lub clickupa.
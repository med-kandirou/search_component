public class helper {
    public static List<String> getOccurance(List<Id> stockIds){
        Map<String, Integer> occurrences = new Map<String, Integer>();
        // Count occurrences of each element in the input list
        for (String element : stockIds) {
            if (occurrences.containsKey(element)) {
                occurrences.put(element, occurrences.get(element) + 1);
            } else {
                occurrences.put(element, 1);
            }
        }
        // Find the maximum occurrences
        Integer maxOccurrences = 0;
        for (Integer count : occurrences.values()) {
            if (count > maxOccurrences) {
                maxOccurrences = count;
            }
        }
        // Collect all elements with maximum occurrences
        List<String> maxOccurrenceValues = new List<String>();
        for (String element : occurrences.keySet()) {
            if (occurrences.get(element) == maxOccurrences) {
                maxOccurrenceValues.add(element);
            }
        }
        return maxOccurrenceValues;   
    }
}
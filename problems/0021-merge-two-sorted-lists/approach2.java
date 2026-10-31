/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if (list1 == null) return list2; // one list is empty: the answer is the other one // @viz base
        if (list2 == null) return list1; // @viz base
        if (list1.val <= list2.val) { // the smaller head goes first (list1 on a tie) // @viz pick
            list1.next = mergeTwoLists(list1.next, list2); // @viz left
            return list1; // @viz left
        }
        list2.next = mergeTwoLists(list1, list2.next); // @viz right
        return list2; // @viz right
    }
}

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
        ListNode dummy = new ListNode(); // in front, so the first node isn't a special case // @viz init
        ListNode tail = dummy; // @viz init
        while (list1 != null && list2 != null) { // @viz loop
            if (list1.val <= list2.val) { // take the smaller head (list1 on a tie) // @viz pick
                tail.next = list1; // @viz left
                list1 = list1.next; // @viz left
            } else {
                tail.next = list2; // @viz right
                list2 = list2.next; // @viz right
            }
            tail = tail.next; // @viz advance
        }
        tail.next = list1 != null ? list1 : list2; // one list is used up: attach the rest of the other // @viz rest
        return dummy.next; // @viz return
    }
}

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    void reorderList(ListNode* head) {
        ListNode* slow = head; // step 1: find the middle // @viz middle
        ListNode* fast = head; // @viz middle
        while (fast->next && fast->next->next) { // @viz middle
            slow = slow->next; // @viz middle
            fast = fast->next->next; // @viz middle
        }
        ListNode* second = slow->next; // step 2: cut after the middle and reverse the second half // @viz reverse
        slow->next = nullptr; // @viz reverse
        ListNode* prev = nullptr; // @viz reverse
        while (second) { // @viz reverse
            ListNode* next = second->next; // @viz reverse
            second->next = prev; // @viz reverse
            prev = second; // @viz reverse
            second = next; // @viz reverse
        }
        ListNode* first = head; // step 3: merge, one from each half // @viz merge
        second = prev; // @viz merge
        while (second) { // the second half is never longer than the first // @viz merge
            ListNode* n1 = first->next; // @viz merge
            ListNode* n2 = second->next; // @viz merge
            first->next = second; // @viz merge
            second->next = n1; // @viz merge
            first = n1; // @viz merge
            second = n2; // @viz merge
        }
    }
};

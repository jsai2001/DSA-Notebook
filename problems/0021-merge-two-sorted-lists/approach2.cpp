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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        if (!list1) return list2; // one list is empty: the answer is the other one // @viz base
        if (!list2) return list1; // @viz base
        if (list1->val <= list2->val) { // the smaller head goes first (list1 on a tie) // @viz pick
            list1->next = mergeTwoLists(list1->next, list2); // @viz left
            return list1; // @viz left
        }
        list2->next = mergeTwoLists(list1, list2->next); // @viz right
        return list2; // @viz right
    }
};

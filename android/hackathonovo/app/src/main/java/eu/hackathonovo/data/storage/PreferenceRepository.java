package eu.hackathonovo.data.storage;

public interface PreferenceRepository {

    void setUserId(long userId);

    long getUserId();

    void setActionId(int id);

    int getActionId();

}
